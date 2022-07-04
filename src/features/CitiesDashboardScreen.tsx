import {Text} from 'react-native';
import React, {useEffect} from 'react';
// import {useLocation} from 'hooks/useLocation';
import {useAppSelector, useAppDispatch} from 'store';
import {getCitiesAction} from 'store/slices/cities';
import styled from 'styled-components/native';

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

export const CitiesDashboardScreen = () => {
  // const {location} = useLocation();
  const cities = useAppSelector(state => state.cities.cities);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const getData = async () => {
  //     if (location) {
  //       const resultForecast = await getForecastForLocationAPI(location);
  //       setForecast(resultForecast);
  //       const resultCity = await getCityforLocationAPI(location);
  //       setCity(resultCity);
  //     }
  //   };
  //   getData();
  // }, [location]);

  useEffect(() => {
    dispatch(getCitiesAction());
  }, [dispatch]);

  return (
    <Container>
      <InnerContainer>
        <Text>App</Text>
        <Text>{JSON.stringify(cities, null, 2)}</Text>
      </InnerContainer>
    </Container>
  );
};
