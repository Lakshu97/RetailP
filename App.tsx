/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppNavigation from './AppModules/Navigation/AppNavigation';
import {Provider} from 'react-redux';

import store from './AppModules/Redux/store';
import {Portal} from 'react-native-paper';
function App(): JSX.Element {
  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </SafeAreaView>
  );
}

export default App;
