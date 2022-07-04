import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getCitiesAPI} from 'api/weather';
import {City} from 'types/City';

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

export const getCitiesAction = createAsyncThunk(
  'cities/getCities',
  async () => {
    const cities = await getCitiesAPI();
    return cities.map(city => ({
      name: city.name,
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
      .addCase(getCitiesAction.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCitiesAction.fulfilled, (state, {payload}) => {
        state.cities = payload;
      })
      .addCase(getCitiesAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const citiesReducer = citiesSlice.reducer;

export const {setCurrentLocation: actionSetCurrentLocation} =
  citiesSlice.actions;
