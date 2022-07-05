// @ts-ignore
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {config} from 'src/config';
import {City} from 'src/types/City';
import {CurrentWeatherData, Forecast5} from 'src/types/openWeatherMaps';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: config.weatherURL}),
  endpoints: builder => ({
    getFutureForecast: builder.query<Forecast5, City>({
      query: city =>
        `/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${config.apiKey}&units=metric`,
    }),
    getCurrentForecast: builder.query<CurrentWeatherData, City>({
      query: city =>
        `/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${config.apiKey}&units=metric`,
    }),
  }),
});

export const {useGetFutureForecastQuery, useGetCurrentForecastQuery} = apiSlice;

export const apiReducer = apiSlice.reducer;
