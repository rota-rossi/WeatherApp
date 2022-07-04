import React from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from './store';
import {CitiesDashboardScreen} from 'features/CitiesDashboardScreen';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={CitiesDashboardScreen} />
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
