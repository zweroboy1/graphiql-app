import { createSlice } from '@reduxjs/toolkit';

type User = {
  name: string;
  email: string;
};

const initialState: { value: User | null } = {
  value: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: { payload: User | null }) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
