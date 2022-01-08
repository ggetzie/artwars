import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  Cities,
  CityName,
  setupNPCs,
  NPC,
  setupArtworks,
  ArtWork,
  getNPCForCity,
  CategoryName,
  Categories,
  randomCategory,
} from '../util';
import {ArtWorkFilter} from '../util/awFilter';
import {Transaction} from '../util';

interface gameState {
  player: string;
  balance: number;
  npcs: NPC[];
  currentCity: CityName;
  artworks: ArtWork[];
  hot: CategoryName;
}

const npcs = setupNPCs();
const artworks = setupArtworks(Object.values(Cities), npcs);

const initialState: gameState = {
  player: 'Player',
  balance: 2000000,
  npcs: npcs,
  currentCity: Cities.London,
  artworks: artworks,
  hot: randomCategory(),
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
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
    setHot: (state, action: PayloadAction<CategoryName>) => {
      state.hot = action.payload;
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
  },
});

export const {
  setPlayer,
  creditBalance,
  debitBalance,
  updateBalance,
  setCity,
  transact,
  updateArtwork,
} = gameSlice.actions;

export const selectPlayer = (game: gameState) => game.player;

export const selectCity = (game: gameState) => game.currentCity;

export const selectBalance = (game: gameState) => game.balance;

export const selectNPC = (game: gameState, city: CityName) =>
  getNPCForCity(city, game.npcs);

export const filterArtWorks = (game: gameState, criteria: ArtWorkFilter) =>
  game.artworks.filter(aw => criteria.match(aw));

export const currentNPC = (game: gameState) =>
  getNPCForCity(game.currentCity, game.npcs);

export const currentHot = (game: gameState) => game.hot;

export default gameSlice.reducer;
