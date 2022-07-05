// @ts-ignore
import SQLiteStorage from 'redux-persist-sqlite-storage';
import SQLite from 'react-native-sqlite-storage';
import {persistReducer} from 'redux-persist';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getCitiesAPI} from 'api/weather';
import {City} from 'types/City';
import {RootState} from '..';

type CitiesState = {
  cities: City[];
  isLoading: boolean;
  error?: string;
};

const initialState: CitiesState = {
  cities: [],
  isLoading: false,
  error: undefined,
};

export const actionGetCities = createAsyncThunk(
  'cities/getCities',
  async () => {
    const cities = await getCitiesAPI();
    return cities.map(city => ({
      name: city.name,
      state: city.state,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
    }));
  },
);

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setCurrentLocation: (state, {payload}: PayloadAction<City>) => {
      state.cities[0] = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(actionGetCities.pending, state => {
        state.isLoading = true;
      })
      .addCase(actionGetCities.fulfilled, (state, {payload}) => {
        state.cities = payload;
      })
      .addCase(actionGetCities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

const sqliteConfig = {
  name: 'weatherapp-cities',
  location: 'weatherapp.db',
};

SQLite.enablePromise(true);

const storageEngine = SQLiteStorage(SQLite, sqliteConfig);

const persistConfig = {
  key: 'cities',
  storage: storageEngine,
};

export const citiesReducer = persistReducer(persistConfig, citiesSlice.reducer);

export const citiesSelector = (state: RootState) => state.cities.cities;

export const {setCurrentLocation: actionSetCurrentLocation} =
  citiesSlice.actions;
