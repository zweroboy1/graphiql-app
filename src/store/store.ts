/// <reference types="redux-persist" />

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/es/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

import { userReducer } from './slices/userSlice';
import { schemasApi } from './api/api';
import { schemasReducer } from './slices/schemaSlice';
import { activeTypeReducer } from './slices/activeTypeSlice';
import { historyReducer } from './slices/history.slice';
import { ApiEndpointReducer } from './slices/apiEndpoint.slice';
import { editorReducer } from './slices/editorSlice';
import { viewerReducer } from './slices/viewerSlice';
import { queryFieldsReducer } from './slices/queryFields.slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['apiEndpoint', 'editor', 'viewer', 'queryFields'],
};

const rootReducer = combineReducers({
  apiEndpoint: ApiEndpointReducer,
  editor: editorReducer,
  user: userReducer,
  schemas: schemasReducer,
  type: activeTypeReducer,
  history: historyReducer,
  viewer: viewerReducer,
  queryFields: queryFieldsReducer,
  [schemasApi.reducerPath]: schemasApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({ serializableCheck: false }).concat(
      schemasApi.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
