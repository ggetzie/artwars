import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';
import {
  Cities,
  setupNPCs,
  setupArtworks,
  getNPCForCity,
  Categories,
  randomCategory,
  diceRoll,
  randomChoiceR,
  randRange,
  setupDuties,
  ARTWORKS,
} from '../util';
import {
  CategoryName,
  CityName,
  DutyMap,
  Transaction,
  NPCData,
  NPCTotal,
  Artwork,
  ArtworkData,
} from '../util/types';
import {ArtWorkFilter} from '../util/awFilter';

export interface gameState {
  readonly id: string;
  player: string;
  started: string;
  turn: number;
  maxTurns: number;
  balance: number;
  npcs: NPCData[];
  currentCity: CityName;
  artworksData: ArtworkData[];
  hot: CategoryName;
  underInvestigation: boolean;
  messages: string[];
  duties: DutyMap;
}

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
    artworksData: setupArtworks(),
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
      let aw = state.artworksData[index];
      state.balance += action.payload.price;
      aw.owner = action.payload.newOwner;
      aw.currentValue = Math.abs(action.payload.price);
      aw.auction = false;
      state.artworksData = state.artworksData
        .slice(0, index)
        .concat([aw])
        .concat(state.artworksData.slice(index + 1));
    },
    updateArtwork: (state, action: PayloadAction<ArtworkData>) => {
      // replace ArtWork with one with updated data
      const index = action.payload.id;
      state.artworksData = state.artworksData
        .slice(0, index)
        .concat([action.payload])
        .concat(state.artworksData.slice(index + 1));
    },
    setArtworks: (state, action: PayloadAction<ArtworkData[]>) => {
      state.artworksData = action.payload.sort(
        (a: ArtworkData, b: ArtworkData): number => a.id - b.id,
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
      let artworks = [...state.artworksData];

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
              artworks[id].currentValue = 0;
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
          messages.push(
            `A dastardly thief stole ${ARTWORKS[artworks[stolen].id].title}!`,
          );
        }

        // Retrospective?
        const hadARetro = diceRoll(0.1);
        const playerArtists = portfolioIds.map(id => ARTWORKS[id].artist);
        if (hadARetro) {
          const selected = randomChoiceR(playerArtists);
          messages.push(
            `A major museum just announced a retrospective of ${selected}. Their work increased in value by 50%!`,
          );
          for (let aw of artworks) {
            const awIm = ARTWORKS[aw.id];
            if (awIm.artist === selected) {
              aw.currentValue = Math.round(aw.currentValue * 1.5);
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
            const awIm = ARTWORKS[aw.id];
            if (awIm.artist === selected) {
              aw.currentValue = Math.round(aw.currentValue * 0.5);
            }
          }
        }

        // Repatriated?
        const repatriated = diceRoll(0.05);
        if (repatriated) {
          const selected = randomChoiceR(portfolioIds);
          messages.push(
            `${ARTWORKS[selected].title} has been repatriated to its home country and returned to the rightful owners.`,
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
        const awIm = ARTWORKS[aw.id];
        const factor = adjustments.get(awIm.category);
        aw.currentValue = Math.round(aw.currentValue * factor);
      }
      state.artworksData = artworks;
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

export const selectArtworks = (game: gameState) => game.artworksData;

export const getArtworkData = (game: gameState, awId: number) =>
  game.artworksData[awId];

export const getArtwork = (game: gameState, awId: number): Artwork => {
  return {
    static: ARTWORKS[awId],
    data: game.artworksData[awId],
  };
};

export const filterArtWorks = (
  game: gameState,
  criteria: ArtWorkFilter,
): Artwork[] => {
  return game.artworksData
    .filter(aw => criteria.match(aw))
    .map(data => {
      return {static: ARTWORKS[data.id], data: data};
    });
};

export const currentNPC = (game: gameState): NPCTotal => {
  const npc = getNPCForCity(game.currentCity);
  return {
    character: npc,
    data: game.npcs[npc.id],
  };
};

export const currentHot = (game: gameState): CategoryName => game.hot;

export const isUnderInvestigation = (game: gameState) =>
  game.underInvestigation;

export const currentTurn = (game: gameState) => game.turn;

export const getMaxTurns = (game: gameState) => game.maxTurns;

export const portfolioValue = (game: gameState) =>
  game.artworksData.reduce(
    (p, c) => (c.owner === game.player ? p + c.currentValue : p),
    0,
  );

export const getMessages = (game: gameState) => game.messages;

export const getDuty = (game: gameState, city: CityName) => game.duties[city];

export default gameSlice.reducer;
