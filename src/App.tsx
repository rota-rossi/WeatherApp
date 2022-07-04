import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import {CitiesDashboardScreen} from 'features/CitiesDashboardScreen';

export const App = () => {
  return (
    <Provider store={store}>
      <CitiesDashboardScreen />
    </Provider>
  );
};
