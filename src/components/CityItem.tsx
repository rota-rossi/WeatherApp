import {View, Text} from 'react-native';
import React from 'react';
import {City} from 'src/types/City';
import {FC} from 'react';
import {useGetCurrentForecastQuery} from 'src/api/apiSlice';

type ScreenProps = {
  city: City;
};
const CityItem: FC<ScreenProps> = ({city}) => {
  const {data: currentForecast, isSuccess} = useGetCurrentForecastQuery(city, {
    pollingInterval: 60000,
  });

  return (
    <View>
      <Text>
        {city.name}, {city.state ? `${city.state}, ` : ''} {city.country}
      </Text>
      {isSuccess && (
        <Text>
          {currentForecast.main.temp} - {currentForecast.main.humidity}
        </Text>
      )}
    </View>
  );
};

export default CityItem;
