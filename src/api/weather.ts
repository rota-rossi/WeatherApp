import {GeoPosition} from 'react-native-geolocation-service';
import {ReverseGeocoding} from 'src/types/openWeatherMaps';
import {City} from 'types/City';
import {config} from '../config';

export const getCityforLocationAPI = async (
  location: GeoPosition,
): Promise<ReverseGeocoding> => {
  const response = await fetch(
    `${config.weatherURL}/geo/1.0/reverse?lat=${location.coords.latitude}&lon=${location.coords.longitude}&limit=1&appid=${config.apiKey}`,
  );
  const data = await response.json();
  return data?.[0];
};

export const getCitiesAPI = async (): Promise<City[]> => {
  const response = await fetch('http://localhost:5000/cities');
  const data = await response.json();
  return data;
};
