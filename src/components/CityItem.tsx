import {View, Text} from 'react-native';
import React from 'react';
import {City} from 'src/types/City';
import {FC} from 'react';
import {useGetCurrentForecastQuery} from 'src/api/apiSlice';
import styled from 'styled-components/native';

const Image = styled.Image`
  width: 40px;
  height: 40px;
`;

type ScreenProps = {
  city: City;
};
const CityItem: FC<ScreenProps> = ({city}) => {
  const {data: currentForecast, isSuccess} = useGetCurrentForecastQuery(city, {
    pollingInterval: 60000,
  });

  const imageUri = isSuccess
    ? `https://openweathermap.org/img/wn/${currentForecast.weather[0].icon}.png`
    : '';
  return (
    <View>
      <Text>
        {city.name}, {city.state ? `${city.state}, ` : ''} {city.country}
      </Text>
      {isSuccess && (
        <>
          <Image source={{uri: imageUri}} />
          <Text>
            {currentForecast.main.temp} - {currentForecast.main.humidity}
          </Text>
        </>
      )}
    </View>
  );
};

export default CityItem;
