import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {config} from 'src/config';
import {City} from 'src/types/City';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: config.weatherURL}),
  endpoints: builder => ({
    getFutureForecast: builder.query({
      query: (city: City) =>
        `/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${config.apiKey}&units=metric`,
    }),
    getCurrentForecast: builder.query({
      query: (city: City) =>
        `/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${config.apiKey}&units=metric`,
    }),
  }),
});

export const {useGetFutureForecastQuery, useGetCurrentForecastQuery} = apiSlice;
