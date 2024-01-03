import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type ApiEndpoint = {
  api: string;
  isValid: boolean;
};

const initialState: ApiEndpoint = {
  api: 'https://rickandmortyapi.com/graphql',
  isValid: true,
};

export const apiEndpointSlice = createSlice({
  name: 'apiEndpoint',
  initialState,
  reducers: {
    setApiEndpointSlice: (state, action: PayloadAction<string>) => {
      state.api = action.payload;
    },
    setValid: (state, action: PayloadAction<boolean>) => {
      state.isValid = action.payload;
    },
  },
});

export const apiUrl = (state: RootState) => state.apiEndpoint.api;

export const { setApiEndpointSlice, setValid } = apiEndpointSlice.actions;
export const ApiEndpointReducer = apiEndpointSlice.reducer;
