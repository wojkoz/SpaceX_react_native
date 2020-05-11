import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import DrawerButton from './components/DrawerButton';
import {Navigation} from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';

class App extends Component {
  constructor() {
    super();
  }
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
  navigateToScreen = (name, title = '') => {
    if (title === '') {
      title = name;
    }

    Navigation.push('MAIN_STACK', {
      component: {
        name: name,
        options: {
          topBar: {
            title: {
              text: title,
            },
          },
        },
      },
    });
  };
  render() {
    return (
      <View>
        <View style={styles.topContainer}>
          <Text style={styles.textFormatLogo}>Spacex</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.flexContent}>
            <DrawerButton
              style={styles.textFormat}
              title="Rockets"
              navigateTo={() => this.navigateToScreen('Rockets')}
            />
          </View>
          <View style={styles.flexContent}>
            <DrawerButton
              style={styles.textFormat}
              title="Historical Events"
              navigateTo={() =>
                this.navigateToScreen('HistoricalEvents', 'Historical Events')
              }
            />
          </View>
          <View style={styles.flexContent}>
            <DrawerButton
              style={styles.textFormat}
              title="Launches"
              navigateTo={() => this.navigateToScreen('Launches')}
            />
          </View>
          <View style={styles.flexContent}>
            <DrawerButton
              style={styles.textFormat}
              title="Missions"
              navigateTo={() => this.navigateToScreen('Missions')}
            />
          </View>
          <View style={styles.flexContent_Last}>
            <DrawerButton
              style={styles.textFormat}
              title="Tesla Car"
              navigateTo={() =>
                this.navigateToScreen('TeslaCarDetails', 'Tesla Car')
              }
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawer: {
    padding: 12,
    height: '100%',
    backgroundColor: 'white',
  },
  textFormat: {
    color: '#01142F',
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 10,
    color: '#01142F',
    textAlign: 'center',
  },
  textFormatLogo: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 40,
    letterSpacing: 11,
    paddingLeft: 10,
    paddingBottom: 12,
  },
  topContainer: {
    padding: 45,
    backgroundColor: '#01142F',
    paddingBottom: 60,
  },
  flexContent: {
    width: Dimensions.get('window').width / 2,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  flexContent_Last: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: 'white',
  },
  bottomContainer: {
    paddingTop: 10,
    height: Dimensions.get('window').height,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default App;
