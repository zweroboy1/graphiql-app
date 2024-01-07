import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setApiEndpointSlice } from './apiEndpoint.slice';

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
    clearAllHistory: (state) => {
      state.history = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setApiEndpointSlice, (state) => {
      state.history = [];
    });
  },
});

export const { addToHistory, removeFromHistory, clearAllHistory } =
  historySlice.actions;

export const historyReducer = historySlice.reducer;
