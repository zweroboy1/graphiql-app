import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type ApiEndpoint = {
  api: string;
};

const initialState: ApiEndpoint = {
  api: 'https://rickandmortyapi.com/graphql',
};

export const apiEndpointSlice = createSlice({
  name: 'apiEndpoint',
  initialState,
  reducers: {
    setApiEndpointSlice: (state, action: PayloadAction<string>) => {
      state.api = action.payload;
    },
  },
});

export const apiUrl = (state: RootState) => state.apiEndpoint.api;

export const { setApiEndpointSlice } = apiEndpointSlice.actions;
export const ApiEndpointReducer = apiEndpointSlice.reducer;
