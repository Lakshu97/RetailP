/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {initializeApp} from '@react-native-firebase/app';
initializeApp();
if (__DEV__) {
  import('./AppModules/Dev/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}
AppRegistry.registerComponent(appName, () => App);
