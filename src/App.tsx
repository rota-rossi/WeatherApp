import {Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {getCityforLocation, getForecastForLocation} from './api/weather';
import {useLocation} from './hooks/useLocation';

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const App = () => {
  const {location} = useLocation();
  const [forecast, setForecast] = useState();
  const [city, setCity] = useState();
  useEffect(() => {
    const getData = async () => {
      if (location) {
        const resultForecast = await getForecastForLocation(location);
        setForecast(resultForecast);
        const resultCity = await getCityforLocation(location);
        setCity(resultCity);
      }
    };
    getData();
  }, [location]);

  return (
    <Container>
      <InnerContainer>
        <Text>App</Text>
        <Text>{JSON.stringify(city, null, 2)}</Text>
        <Text>{JSON.stringify(forecast, null, 2)}</Text>
      </InnerContainer>
    </Container>
  );
};
