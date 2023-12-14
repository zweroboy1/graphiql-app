import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { schemasApi } from './api/api';
import { schemasReducer } from './slices/schemaSlice';
import { activeTypeReducer } from './slices/activeTypeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    schemas: schemasReducer,
    type: activeTypeReducer,
    [schemasApi.reducerPath]: schemasApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(schemasApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
