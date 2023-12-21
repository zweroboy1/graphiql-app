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
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = editorSlice.actions;

export const editorReducer = editorSlice.reducer;
