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
import CityItem from 'src/components/CityItem';
import {useSelector} from 'react-redux';
import {City} from 'src/types/City';
import {FlatList, ListRenderItem} from 'react-native';
import {RootProps, RootStackRoutes} from 'src/types/RootStack';
import {FC} from 'react';

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const InnerContainer = styled(FlatList<City>)`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: white;
`;
type ScreenProps = RootProps<RootStackRoutes.Home>;

export const CitiesDashboardScreen: FC<ScreenProps> = props => {
  const {location} = useLocation();
  const cities = useSelector(citiesSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getCities = async () => {
      await dispatch(actionGetCities()).unwrap();
      if (location) {
        const currentCity = await getCityforLocationAPI(location);
        dispatch(actionSetCurrentLocation(currentCity));
      }
    };
    getCities();
  }, [dispatch, location]);

  const handlePress = (city: City) => () => {
    props.navigation.navigate(RootStackRoutes.DetailedForecast, {city});
  };

  const renderItem: ListRenderItem<City> = ({item}) => (
    <CityItem city={item} handlePress={handlePress(item)} />
  );

  return (
    <Container>
      <InnerContainer data={cities} renderItem={renderItem} />
    </Container>
  );
};
