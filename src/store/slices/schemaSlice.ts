import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Data } from '../../types/types';

type Schema = {
  schema: Data | null;
};

const initialState: Schema = {
  schema: null,
};

export const schemaSlice = createSlice({
  name: 'schemas',
  initialState,
  reducers: {
    setSchema: (state, action: PayloadAction<Data>) => {
      state.schema = action.payload;
    },
  },
});

export const { setSchema } = schemaSlice.actions;
export const schemasReducer = schemaSlice.reducer;
