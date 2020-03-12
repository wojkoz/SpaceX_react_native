import React from 'react';
import {StyleSheet} from 'react-native';

import HistoricalEvents from './screens/listItems/HistoricalEvents';

import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  storeData = async () => {
    try {
      await AsyncStorage.setItem('@storage_Key', 'stored value');
    } catch (e) {
      // saving error
    }
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        // value previously stored
        alert('dziala async');
      }
    } catch (e) {
      // error reading value
    }
  };

  return <HistoricalEvents />;
};

const styles = StyleSheet.create({
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
