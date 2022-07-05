import {createSelector} from '@reduxjs/toolkit';
import {format, fromUnixTime} from 'date-fns';
import {
  SelectFromFutureResultType,
  SelectFromFutureReturnType,
  SelectFromCurrentResultType,
} from './types';

export const futureForecastSelector = createSelector(
  (res: SelectFromFutureResultType) => ({
    data: res.data,
    isLoading: res.isLoading,
    isSuccess: res.isSuccess,
  }),
  ({data, isLoading, isSuccess}) => {
    if (!data) {
      return {};
    }
    const tempData = data.list.reduce<SelectFromFutureReturnType>(
      (accum, item) => {
        const formattedItem = {
          date: item.dt,
          temp: item.main.temp,
          tempMin: item.main.temp_min,
          tempMax: item.main.temp_max,
          feelsLike: item.main.feels_like,
          humidity: item.main.humidity,
          skyCoverage: item.weather[0].main,
          icon: item.weather[0].icon,
        };
        const date = format(fromUnixTime(item.dt), 'yyyyMMdd');
        const hour = format(fromUnixTime(item.dt), 'HH:mm');
        //@ts-ignore
        if (accum[date]) {
          return {
            ...accum,
            [date]: [
              //@ts-ignore
              ...accum[date],
              {
                ...formattedItem,
                hour,
              },
            ],
          };
        }
        return {
          ...accum,
          [date]: [{...formattedItem, hour}],
        };
      },
      {},
    );
    const finalData = Object.entries(tempData).map(item => ({
      title: item[0],
      data: item[1],
    }));
    return {
      isSuccessFutureForecast: isSuccess,
      isLoadingFutureForecast: isLoading,
      data: finalData,
    };
  },
);

export const currentForecastSelector = createSelector(
  (res: SelectFromCurrentResultType) => ({
    data: res.data,
    isLoading: res.isLoading,
    isSuccess: res.isSuccess,
  }),
  ({data, isLoading, isSuccess}) => ({
    isLoadingCurrentForecast: isLoading,
    isSuccessCurrentForecast: isSuccess,
    data: {
      ...data?.main,
      icon: data?.weather[0].icon,
      description: data?.weather[0].main,
    },
  }),
);
