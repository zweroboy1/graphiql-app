import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { graphqlPageReset } from '../actions';

interface EditorState {
  value: string;
}

const initialState: EditorState = {
  value: '',
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setEditorValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(graphqlPageReset, (state) => {
      state.value = '';
    });
  },
});

export const { setEditorValue } = editorSlice.actions;

export const editorReducer = editorSlice.reducer;
