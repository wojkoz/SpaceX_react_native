import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions, Image, ImageBackground} from 'react-native';
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
          <View>
            <ImageBackground source={require('./assets/img/background.gif')} style={{width: Dimensions.get('window').width,height: 300}}>
              <Text style={styles.title}>Spacex</Text>
            </ImageBackground>
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
    fontSize: 25,
    marginVertical: 10,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Christopher-Done'
  },
  flexContent: {
    width: Dimensions.get('window').width / 2,
    alignItems: 'center',
    padding: 10,
    marginTop: 25,
    borderBottomWidth: 1,
    borderColor: 'white',
    height: 100
  },
  flexContent_Last: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    padding: 15,
    marginTop: 25,
    height: 100
  },
  bottomContainer: {
    paddingTop: 10,
    height: Dimensions.get('window').height,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'rgb(0,39,64)',
  },
  title:{
    fontFamily: 'Christopher-Done',
    textAlign: "center",
    paddingTop: 50,
    color: 'white',
    fontSize: 35,
    letterSpacing: 18,
  }
});
export default App;
