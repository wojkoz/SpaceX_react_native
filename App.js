import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

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

  return <Text style={styles.footer}>Tutaj ma byc lista Eventow spacex</Text>;
};

const styles = StyleSheet.create({
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
