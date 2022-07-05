import {
  QueryDefinition,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import {UseQueryStateDefaultResult} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {City} from 'src/types/City';
import {CurrentWeatherData, Forecast5} from 'src/types/openWeatherMaps';

export declare type SelectFromFutureResultType = UseQueryStateDefaultResult<
  QueryDefinition<
    City,
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      {},
      FetchBaseQueryMeta
    >,
    never,
    Forecast5,
    'api'
  >
>;

export type SelectFromFutureItem = {
  date: number;
  temp: number;
  tempMin: number;
  tempMax: number;
  feelsLike: number;
  humidity: number;
  skyCoverage: string;
  icon: string;
  hour: string;
};
export type SelectFromFutureReturnType = {
  [key: string]: SelectFromFutureItem[];
};

export declare type SelectFromCurrentResultType = UseQueryStateDefaultResult<
  QueryDefinition<
    City,
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      {},
      FetchBaseQueryMeta
    >,
    never,
    CurrentWeatherData,
    'api'
  >
>;
