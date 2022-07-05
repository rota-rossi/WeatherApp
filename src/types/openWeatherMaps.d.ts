type Coordinates = {
  lon: number;
  lat: number;
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
  temp_kf: number;
};

type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

type Precipitation = {
  '1h': number;
  '3h': number;
};

type System = {
  type: number;
  id: number;
  message: string;
  country: string;
  sunrise: number;
  sunset: number;
};

type Clouds = {
  all: number;
};

type ListItem = {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Precipitation;
  snow?: Precipitation;
  sys: {
    pod: 'd' | 'n';
  };
  dt_txt: string;
};

type City = {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

export type CurrentWeatherData = {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  rain?: Precipitation;
  snow: Precipitation;
  dt: number;
  sys: System;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type Forecast5 = {
  cod: number;
  message: number;
  cnt: number;
  list: ListItem[];
  city: City;
};

export type DirectGeocoding = {
  name: string;
  local_names: {
    [key: string]: string;
  };
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

export type ZipGeocoding = {
  zip: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
};

export type ReverseGeocoding = DirectGeocoding & {
  local_names: {
    [key: string]: string;
    feature_name: string;
    ascii: string;
  };
};
