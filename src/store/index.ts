import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {citiesReducer} from './slices/cities';

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector<RootState>;
export const useAppDispatch = useDispatch<AppDispatch>;
