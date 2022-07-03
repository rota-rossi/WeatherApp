import {config} from '../config';

export const getLocalGeoInfo = async () => {
  const response = await fetch(
    `${config.weatherURL}/geo/1.0/direct?q=Barrie,CA&appid=${config.apiKey}`,
  );
  const data = await response.json();
  return data;
};
