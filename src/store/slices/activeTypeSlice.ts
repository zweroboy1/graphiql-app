import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ActiveType = {
  name: string;
};

const initialState: ActiveType = {
  name: '',
};

export const activeTypeSlice = createSlice({
  name: 'schemas',
  initialState,
  reducers: {
    setActiveType: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setActiveType } = activeTypeSlice.actions;
export const activeTypeReducer = activeTypeSlice.reducer;
