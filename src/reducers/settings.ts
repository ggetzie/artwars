import {createSlice, PayloadAction} from '@reduxjs/toolkit';
type DotComma = ',' | '.';
interface settingsState {
  startingBalance: number;
  thousandsSeparator: DotComma;
  decimalSeparator: DotComma;
}

const initialState: settingsState = {
  startingBalance: 2_000_000,
  thousandsSeparator: ',',
  decimalSeparator: '.',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setStartingBalance: (state, action: PayloadAction<number>) => {
      state.startingBalance = action.payload;
    },
    setThousands: (state, action: PayloadAction<DotComma>) => {
      state.thousandsSeparator = action.payload;
    },
    setDecimal: (state, action: PayloadAction<DotComma>) => {
      state.decimalSeparator = action.payload;
    },
  },
});

export const {setStartingBalance, setThousands, setDecimal} =
  settingsSlice.actions;

export const selectStartingBalance = (state: settingsState) =>
  state.startingBalance;
export const selectThousands = (state: settingsState) =>
  state.thousandsSeparator;
export const selectDecimal = (state: settingsState) => state.decimalSeparator;

export default settingsSlice.reducer;
