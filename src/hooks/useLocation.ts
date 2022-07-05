import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {hasLocationPermission} from '../utils/hasLocationPermission';

export const useLocation = () => {
  const [location, setLocation] = useState<GeoPosition>();

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(undefined);
      },
      {
        accuracy: {
          ios: 'reduced',
          android: 'low',
        },
        maximumAge: 1500,
        timeout: 15000,
        distanceFilter: 0,
      },
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    getLocation,
    location,
  };
};
