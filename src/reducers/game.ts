import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import {Cities, setupNPCs, NPC} from '../util';

interface gameState {
  player: string;
  balance: number;
  npcs: NPC[];
  currentCity: Cities;
}

const npcs = setupNPCs();

const initialState: gameState = {
  player: 'Player',
  balance: 2000000,
  npcs: npcs,
  currentCity: Cities.London,
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
    setCity: (state, action: PayloadAction<Cities>) => {
      state.currentCity = action.payload;
    },
  },
});

export const {setPlayer, creditBalance, debitBalance, updateBalance, setCity} =
  gameSlice.actions;
export const selectPlayer = (state: RootState) => state.game.player;
export const selectCity = (state: RootState) => state.game.currentCity;
export const selectBalance = (state: RootState) => state.game.balance;

export default gameSlice.reducer;
