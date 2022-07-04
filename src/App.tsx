import React from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from './store';
import {CitiesDashboardScreen} from 'features/CitiesDashboardScreen';
import {PersistGate} from 'redux-persist/integration/react';

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CitiesDashboardScreen />
      </PersistGate>
    </Provider>
  );
};
