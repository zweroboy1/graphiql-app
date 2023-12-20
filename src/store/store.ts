import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { schemasApi } from './api/api';
import { schemasReducer } from './slices/schemaSlice';
import { activeTypeReducer } from './slices/activeTypeSlice';
import { historyReducer } from './slices/history.slice';
import { ApiEndpointReducer } from './slices/apiEndpoint.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    schemas: schemasReducer,
    type: activeTypeReducer,
    history: historyReducer,
    apiEndpoint: ApiEndpointReducer,
    [schemasApi.reducerPath]: schemasApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(schemasApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
