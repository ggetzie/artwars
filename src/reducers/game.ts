import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

interface gameState {
  player: string;
  balance: number;
}

const initialState: gameState = {
  player: 'Player',
  balance: 2000000,
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
  },
});

export const {setPlayer, creditBalance, debitBalance, updateBalance} =
  gameSlice.actions;
export const selectPlayer = (state: RootState) => state.game.player;

export default gameSlice.reducer;

// export default function gameReducer(
//   state = initialState,
//   action: reduxPayloadAction,
// ) {
//   switch (action.type) {
//     case SET_PLAYER:
//       return {
//         ...state,
//         player: action.payload,
//       };
//   }
// }
