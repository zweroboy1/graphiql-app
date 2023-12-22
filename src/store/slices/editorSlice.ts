import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
});

export const { setEditorValue } = editorSlice.actions;

export const editorReducer = editorSlice.reducer;
