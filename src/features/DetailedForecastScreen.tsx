import {Text, SectionList, FlatList} from 'react-native';
import React, {FC, useEffect} from 'react';
import {RootProps, RootStackRoutes} from 'src/types/RootStack';
import {
  useGetCurrentForecastQuery,
  useGetFutureForecastQuery,
} from 'src/store/slices/api';
import {Spinner} from 'src/components/Spinner';
import {WeatherIcon} from 'src/components/WeatherIcon';
import {
  currentForecastSelector,
  futureForecastSelector,
} from 'src/store/slices/selectors';
import styled from 'styled-components/native';
import ListHeader from './components/ListHeader';
import SectionHeader from './components/SectionHeader';
import ListItem from './components/ListItem';

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: white;
  padding-bottom: 40px;
`;

const HeaderContainer = styled.View`
  width: 100%;
  display: flex;
  flex-flow: row;
  padding: 24px;
`;

const HeaderTextContainer = styled.View`
  display: flex;
  justify-content: center;
  padding: 24px;
`;

const ListContainer = styled.View`
  padding: 12px 24px;
  background-color: white;
`;

type ScreenProps = RootProps<RootStackRoutes.DetailedForecast>;

export const DetailedForecastScreen: FC<ScreenProps> = props => {
  const {city} = props.route.params;
  useEffect(() => {
    props.navigation.setOptions({
      title: city.name,
    });
  }, [props.navigation, city.name]);

  const {
    data: currentForecast,
    isLoadingCurrentForecast,
    isSuccessCurrentForecast,
  } = useGetCurrentForecastQuery(city, {
    selectFromResult: currentForecastSelector,
  });

  const {data: futureForecasts, isLoadingFutureForecast} =
    useGetFutureForecastQuery(city, {
      selectFromResult: futureForecastSelector,
    });

  if (isLoadingFutureForecast || isLoadingCurrentForecast) {
    return <Spinner />;
  }
  return (
    <Container>
      {isSuccessCurrentForecast && currentForecast.icon && (
        <HeaderContainer>
          <WeatherIcon
            icon={currentForecast.icon}
            size={160}
            label={currentForecast.description}
          />
          <HeaderTextContainer>
            <Text>Max: {currentForecast.temp_max}°C</Text>
            <Text>Min: {currentForecast.temp_min}°C</Text>
            <Text>Feels Like: {currentForecast.feels_like}°C</Text>
          </HeaderTextContainer>
        </HeaderContainer>
      )}

      {futureForecasts && (
        <>
          <ListHeader />
          <SectionList
            sections={futureForecasts}
            keyExtractor={item => item.date.toString()}
            renderItem={() => {
              return null;
            }}
            renderSectionHeader={({section}) => (
              <ListContainer>
                <SectionHeader date={section.title} />
                <FlatList
                  horizontal
                  data={section.data}
                  renderItem={({item}) => <ListItem item={item} />}
                  showsHorizontalScrollIndicator={false}
                />
              </ListContainer>
            )}
          />
        </>
      )}
    </Container>
  );
};
