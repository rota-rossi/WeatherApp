import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from 'api/apiSlice';
import {useDispatch} from 'react-redux';
import {citiesReducer} from './slices/cities';

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch<AppDispatch>;
