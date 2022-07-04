import React, {useEffect} from 'react';
import {useLocation} from 'hooks/useLocation';
import {useAppDispatch} from 'store';
import {
  actionSetCurrentLocation,
  citiesSelector,
  getCitiesAction,
} from 'store/slices/cities';
import styled from 'styled-components/native';
import {getCityforLocationAPI} from 'src/api/weather';
import {GeoPosition} from 'react-native-geolocation-service';
import CityItem from 'src/components/CityItem';
import {useSelector} from 'react-redux';

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
  const {location} = useLocation();
  const cities = useSelector(citiesSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const retrieveCurrentCity = async (loc: GeoPosition) => {
      const currentCity = await getCityforLocationAPI(loc);
      dispatch(actionSetCurrentLocation(currentCity));
    };
    if (location) {
      retrieveCurrentCity(location);
    }
  }, [location, dispatch]);

  useEffect(() => {
    dispatch(getCitiesAction());
  }, [dispatch]);

  return (
    <Container>
      <InnerContainer>
        {cities.map(city => (
          <CityItem city={city} key={city.name} />
        ))}
      </InnerContainer>
    </Container>
  );
};
