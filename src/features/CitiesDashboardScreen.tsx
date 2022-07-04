import React, {useEffect} from 'react';
import {useLocation} from 'hooks/useLocation';
import {useAppDispatch} from 'store';
import {
  actionSetCurrentLocation,
  citiesSelector,
  actionGetCities,
} from 'store/slices/cities';
import styled from 'styled-components/native';
import {getCityforLocationAPI} from 'src/api/weather';
import {GeoPosition} from 'react-native-geolocation-service';
import CityItem from 'src/components/CityItem';
import {useSelector} from 'react-redux';
import {City} from 'src/types/City';
import {FlatList, ListRenderItem} from 'react-native';

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const InnerContainer = styled(
  // FlatList as new (props: FlatListProps<City>) => FlatList<City>,
  FlatList<City>,
)`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: white;
`;

export const CitiesDashboardScreen = () => {
  const {location} = useLocation();
  const cities = useSelector(citiesSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actionGetCities());
  }, [dispatch]);

  useEffect(() => {
    const retrieveCurrentCity = async (loc: GeoPosition) => {
      const currentCity = await getCityforLocationAPI(loc);
      dispatch(actionSetCurrentLocation(currentCity));
    };
    if (location && cities.length > 0) {
      retrieveCurrentCity(location);
    }
  }, [location, dispatch, cities.length]);

  const renderItem: ListRenderItem<City> = ({item}) => <CityItem city={item} />;

  return (
    <Container>
      <InnerContainer data={cities} renderItem={renderItem} />
    </Container>
  );
};
