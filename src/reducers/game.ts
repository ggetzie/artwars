import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';
import {
  Cities,
  setupNPCs,
  setupArtworks,
  ArtWork,
  getNPCForCity,
  CategoryName,
  Categories,
  randomCategory,
  diceRoll,
  randomChoiceR,
  randRange,
  setupDuties,
} from '../util';
import {CityName, DutyMap} from '../util/cities';
import {NPC} from '../util/npcs';
import {ArtWorkFilter} from '../util/awFilter';
import {Transaction} from '../util';

export interface gameState {
  readonly id: string;
  player: string;
  started: string;
  turn: number;
  maxTurns: number;
  balance: number;
  npcs: NPC[];
  currentCity: CityName;
  artworks: ArtWork[];
  hot: CategoryName;
  underInvestigation: boolean;
  messages: string[];
  duties: DutyMap;
}

const npcs = setupNPCs();
const artworks = setupArtworks(Object.values(Cities), npcs);

export function defaultGame(): gameState {
  return {
    id: uuidv4(),
    player: 'Player',
    started: new Date().toISOString(),
    turn: 1,
    maxTurns: 30,
    balance: 2_000_000,
    npcs: setupNPCs(),
    currentCity: Cities.London,
    artworks: setupArtworks(Object.values(Cities), npcs),
    hot: randomCategory(),
    underInvestigation: false,
    messages: [],
    duties: setupDuties(),
  };
}

const initialState: gameState = defaultGame();

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGame: (_, action: PayloadAction<gameState>) => {
      return action.payload;
    },
    setPlayer: (state, action: PayloadAction<string>) => {
      state.player = action.payload;
    },
    creditBalance: (state, action: PayloadAction<number>) => {
      state.balance = state.balance + action.payload;
    },
    debitBalance: (state, action: PayloadAction<number>) => {
      state.balance = state.balance - action.payload;
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    setCity: (state, action: PayloadAction<CityName>) => {
      state.currentCity = action.payload;
    },
    transact: (state, action: PayloadAction<Transaction>) => {
      // Buy or sell an artwork.
      // Change the owner. Add/deduct price to/from player's balance.
      // Set value of artwork to last sale price.
      const index = action.payload.id;
      let aw = state.artworks[index];
      state.balance += action.payload.price;
      aw.owner = action.payload.newOwner;
      aw.value = Math.abs(action.payload.price);
      aw.auction = false;
      state.artworks = state.artworks
        .slice(0, index)
        .concat([aw])
        .concat(state.artworks.slice(index + 1));
    },
    updateArtwork: (state, action: PayloadAction<ArtWork>) => {
      // replace ArtWork with one with updated data
      const index = action.payload.id;
      state.artworks = state.artworks
        .slice(0, index)
        .concat([action.payload])
        .concat(state.artworks.slice(index + 1));
    },
    setArtworks: (state, action: PayloadAction<ArtWork[]>) => {
      state.artworks = action.payload.sort(
        (a: ArtWork, b: ArtWork): number => a.id - b.id,
      );
    },
    setInvestigation: (state, action: PayloadAction<boolean>) => {
      state.underInvestigation = action.payload;
    },
    processTurn: state => {
      // randomly select new hot category
      // adjust artwork valuations
      // hot category artworks go up 1.5x - 3x (select random factor)
      // other categories change value 0.5x - 1.5x (select random for each)
      // random events occur that change prices of artwork in the player's portfolio
      // or cause other effects
      //  - suspected forgery: price 0.1x, 5% chance
      //  - IRS investigation: unable to relocate artworks: 5% chance to start, 33% chance to remove.
      //  - Fire: all artwork in that city destroyed: 0.5% chance
      //  - Theft: 1 artwork removed from portfolio: 1% chance
      //  - Artist has major museum retrospective: 5% chance, Artworks 1.5x
      //  - Artist declared problematic: 1% chance, Artworks 0.5x
      //  - Art repatriated: lose artwork 1% chance,
      let messages: string[] = [];
      let artworks = [...state.artworks];

      const portfolioIds = artworks
        .filter(artwork => artwork.owner === state.player)
        .map(artwork => artwork.id);

      // process events specific to player
      if (portfolioIds.length > 0) {
        // IRS investigation, start or lift
        const irs = state.underInvestigation;
        if (irs) {
          if (diceRoll(0.33)) {
            setInvestigation(false);
            messages.push(
              "You're in the clear! Your tax fraud investigation has been cleared.",
            );
          } else {
            if (diceRoll(0.05)) {
              setInvestigation(true);
              messages.push(
                "Tax authorities have become suspicious of your dealings. You're unable to move artworks between cities.",
              );
            }
          }
        }
        // Fire?
        const hadAFire = diceRoll(0.01);
        if (hadAFire) {
          const playerCities = portfolioIds.map(awId => artworks[awId].city);
          const fireCity = randomChoiceR(playerCities);
          for (let id of portfolioIds) {
            if (artworks[id].city === fireCity) {
              artworks[id].destroyed = true;
              artworks[id].value = 0;
            }
          }
          messages.push(
            `Oh no! A fire in ${fireCity} destroyed your warehouse and all artworks there.`,
          );
        }

        // Theft?
        const hadATheft = diceRoll(0.05);
        if (hadATheft) {
          const nonDestroyed = portfolioIds.filter(
            awId => !artworks[awId].destroyed,
          );
          const stolen = randomChoiceR(nonDestroyed);
          artworks[stolen].owner = 'anon';
          messages.push(`A dastardly thief stole ${artworks[stolen].title}!`);
        }

        // Retrospective?
        const hadARetro = diceRoll(0.1);
        const playerArtists = portfolioIds.map(id => artworks[id].artist);
        if (hadARetro) {
          const selected = randomChoiceR(playerArtists);
          messages.push(
            `A major museum just announced a retrospective of ${selected}. Their work increased in value by 50%!`,
          );
          for (let aw of artworks) {
            if (aw.artist === selected) {
              aw.value = Math.round(aw.value * 1.5);
            }
          }
        }
        // Problematic?
        const problematic = diceRoll(0.1);
        if (problematic) {
          const selected = randomChoiceR(playerArtists);
          messages.push(
            `${selected} has been declared problematic! Their work decreased in value by 50%!`,
          );
          for (let aw of artworks) {
            if (aw.artist === selected) {
              aw.value = Math.round(aw.value * 0.5);
            }
          }
        }

        // Repatriated?
        const repatriated = diceRoll(0.05);
        if (repatriated) {
          const selected = randomChoiceR(portfolioIds);
          messages.push(
            `${artworks[selected].title} has been repatriated to its home country and returned to the rightful owners.`,
          );
          artworks[selected].owner = 'anon';
        }
      }
      // Update values for all based on category
      const newHot = randomCategory();
      state.hot = newHot;
      // set category factors
      let adjustments = new Map();
      for (let category of Object.values(Categories)) {
        adjustments.set(
          category,
          category === newHot ? randRange(1.5, 3) : randRange(0.5, 1.5),
        );
      }
      for (let aw of artworks) {
        const factor = adjustments.get(aw.category);
        aw.value = Math.round(aw.value * factor);
      }
      state.artworks = artworks;
      state.messages = messages;
      state.turn += 1;
    },
  },
});

export const {
  setGame,
  setPlayer,
  creditBalance,
  debitBalance,
  updateBalance,
  setCity,
  transact,
  updateArtwork,
  setArtworks,
  setInvestigation,
  processTurn,
} = gameSlice.actions;

export const selectPlayer = (game: gameState) => game.player;

export const selectCity = (game: gameState) => game.currentCity;

export const selectBalance = (game: gameState) => game.balance;

export const selectArtworks = (game: gameState) => game.artworks;

export const selectNPC = (game: gameState, city: CityName) =>
  getNPCForCity(city, game.npcs);

export const filterArtWorks = (game: gameState, criteria: ArtWorkFilter) =>
  game.artworks.filter(aw => criteria.match(aw));

export const currentNPC = (game: gameState) =>
  getNPCForCity(game.currentCity, game.npcs);

export const currentHot = (game: gameState): CategoryName => game.hot;

export const isUnderInvestigation = (game: gameState) =>
  game.underInvestigation;

export const currentTurn = (game: gameState) => game.turn;

export const portfolioValue = (game: gameState) =>
  game.artworks
    .filter(aw => aw.owner === game.player)
    .map(aw => aw.value)
    .reduce((p, c) => p + c, 0);

export const getMessages = (game: gameState) => game.messages;

export const getDuty = (game: gameState, city: CityName) => game.duties[city];

export default gameSlice.reducer;
