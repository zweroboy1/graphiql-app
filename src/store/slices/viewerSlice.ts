import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
});

export const { setViewerValue } = viewerSlice.actions;

export const viewerReducer = viewerSlice.reducer;
