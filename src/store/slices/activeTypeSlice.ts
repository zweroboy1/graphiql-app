import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { setApiEndpointSlice } from './apiEndpoint.slice';

type ActiveType = {
  name: string;
};

const initialState: ActiveType = {
  name: 'Query',
};

export const activeTypeSlice = createSlice({
  name: 'schemas',
  initialState,
  reducers: {
    setActiveType: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setApiEndpointSlice, (state) => {
      state.name = 'Query';
    });
  },
});

export const { setActiveType } = activeTypeSlice.actions;
export const activeTypeReducer = activeTypeSlice.reducer;
