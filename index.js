/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {App} from './src/App';
import {name as appName} from './app.json';
import {initializeMockServer} from './src/api/mock-api';

if (__DEV__) {
  initializeMockServer();
}

AppRegistry.registerComponent(appName, () => App);
