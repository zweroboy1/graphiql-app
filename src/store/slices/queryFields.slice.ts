import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type queryFields = {
  variables: string;
  headers: string;
};

const initialState: queryFields = {
  variables: '',
  headers: '',
};

const queryFieldsSlice = createSlice({
  name: 'queryFields',
  initialState,
  reducers: {
    setVariables: (state, action: PayloadAction<string>) => {
      state.variables = action.payload;
    },
    setHeaders: (state, action: PayloadAction<string>) => {
      state.headers = action.payload;
    },
  },
});
export const { setHeaders, setVariables } = queryFieldsSlice.actions;
export const queryFieldsReducer = queryFieldsSlice.reducer;
