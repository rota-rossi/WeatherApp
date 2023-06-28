import React from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from 'store';
import {CitiesDashboardScreen} from 'features/CitiesDashboardScreen';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, RootStackRoutes} from 'types/RootStack';
import {DetailedForecastScreen} from './features/DetailedForecastScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={RootStackRoutes.Home}
      component={CitiesDashboardScreen}
      options={{title: 'Weather'}}
    />
    <Stack.Screen
      name={RootStackRoutes.DetailedForecast}
      component={DetailedForecastScreen}
      options={props => ({
        title: props.route.params.city.name,
        headerBackTitle: 'Return',
      })}
    />
  </Stack.Navigator>
);

export const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MainStack />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};
