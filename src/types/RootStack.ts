import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {City} from './City';

export enum RootStackRoutes {
  Home = 'Root.Home',
  DetailedForecast = 'Root.DetailedForecast',
}

export type RootStackParamList = {
  [RootStackRoutes.Home]: undefined;
  [RootStackRoutes.DetailedForecast]: {city: City};
};

export type RootProps<T extends RootStackRoutes> = NativeStackScreenProps<
  RootStackParamList,
  T
>;
