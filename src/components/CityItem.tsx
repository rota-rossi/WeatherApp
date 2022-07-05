import React from 'react';
import {City} from 'types/City';
import {FC} from 'react';
import styled from 'styled-components/native';
import {useGetCurrentForecastQuery} from 'store/slices/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {WeatherIcon} from './WeatherIcon';
import {currentForecastSelector} from 'src/store/slices/selectors';

const Container = styled.Pressable`
  width: 100%;
  display: flex;
  flex-flow: row;
  padding: 12px;
  align-items: center;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: lightgray;
`;

const ImageContainer = styled.View`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainTextContainer = styled.View`
  flex: 1;
  padding: 8px 24px;
`;

const SecondaryTextContainer = styled.View`
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 8px;
`;

const CityLabel = styled.Text`
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
`;

const TemperatureLabel = styled.Text`
  font-size: 12px;
  line-height: 16px;
  padding-right: 20px;
`;

const ArrowContainer = styled.View`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowIcon = styled(Icon).attrs({name: 'chevron-right', size: 24})`
  color: #1d1d1d;
`;

type ScreenProps = {
  city: City;
  handlePress: () => void;
};
const CityItem: FC<ScreenProps> = ({city, handlePress}) => {
  const {data: currentForecast, isSuccessCurrentForecast} =
    useGetCurrentForecastQuery(city, {
      pollingInterval: 60000,
      selectFromResult: currentForecastSelector,
    });

  return (
    <Container
      onPress={handlePress}
      style={({pressed}) => ({opacity: pressed ? 0.6 : 1})}>
      {isSuccessCurrentForecast && currentForecast.icon && (
        <ImageContainer>
          <WeatherIcon
            icon={currentForecast.icon}
            label={currentForecast.description}
          />
        </ImageContainer>
      )}
      <MainTextContainer>
        <CityLabel>
          {city.name}, {city.state ? `${city.state}, ` : ''} {city.country}
        </CityLabel>
        {isSuccessCurrentForecast && (
          <SecondaryTextContainer>
            <TemperatureLabel>
              🌡: {Number(currentForecast.temp).toFixed()}°C
            </TemperatureLabel>
            <TemperatureLabel>💧: {currentForecast.humidity}%</TemperatureLabel>
          </SecondaryTextContainer>
        )}
      </MainTextContainer>
      <ArrowContainer>
        <ArrowIcon />
      </ArrowContainer>
    </Container>
  );
};

export default CityItem;
