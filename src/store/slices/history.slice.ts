import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HistoryState {
  history: string[];
}

const initialState: HistoryState = {
  history: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<string>) => {
      state.history = [...state.history, action.payload];
    },
    removeFromHistory: (state) => {
      state.history.pop();
    },
  },
});

export const { addToHistory, removeFromHistory } = historySlice.actions;

export const historyReducer = historySlice.reducer;
