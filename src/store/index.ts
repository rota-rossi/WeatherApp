import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {apiReducer, apiSlice} from './slices/api';
import {useDispatch} from 'react-redux';
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import {persistStore} from 'redux-persist';
import {citiesReducer} from './slices/cities';

const middlewares = [apiSlice.middleware];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const rootReducer = combineReducers({
  cities: citiesReducer,
  [apiSlice.reducerPath]: apiReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type RootReducer = typeof rootReducer;

export const useAppDispatch = useDispatch<AppDispatch>;
