import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import gameReducer from './reducers/game';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
