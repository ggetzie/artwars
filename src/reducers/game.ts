import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

interface gameState {
  player: string;
}

const initialState: gameState = {
  player: 'Player',
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<string>) => {
      state.player = action.payload;
    },
  },
});

export const {setPlayer} = gameSlice.actions;
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
