import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { graphqlPageReset } from '../actions';

interface ViewerState {
  value: string;
}

const initialState: ViewerState = {
  value: '',
};

const viewerSlice = createSlice({
  name: 'viewer',
  initialState,
  reducers: {
    setViewerValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(graphqlPageReset, (state) => {
      state.value = '';
    });
  },
});

export const { setViewerValue } = viewerSlice.actions;

export const viewerReducer = viewerSlice.reducer;
