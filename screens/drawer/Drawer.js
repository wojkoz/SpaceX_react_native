import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';
import {Text, View, StyleSheet, Image} from 'react-native';
import DrawerButton from '../../components/DrawerButton';


class Drawer extends Component {
  constructor() {
    super();
    this.state = {
      active: {
        HistoricalEvents: true,
        Launches: false,
        Missions: false,
        Rockets: false,
        TeslaCarDetails: false,
      },
    };
  }

  hideSideMenu = () => {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: false,
        },
      },
    });
  };

  navigateToScreen = (name, title = '') => {
    if (title === '') {
      title = name;
    }

    this.hideSideMenu();

    //actual navigation

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
  //TODO: zablokowac mozliwosc wyboru tych samych screenow | uzyc redux?
  render() {
    return (
      <View style={styles.drawer}>
        <View>
          <Text style={styles.spacex}>SpaceX</Text>
        </View>
        <View>
          <DrawerButton 
            style={styles.textFormat}
            Icon = "rocket"
            disable={this.state.active.Rockets}
            title="Rockets"
            navigateTo={() => this.navigateToScreen('Rockets')}
          />
          <DrawerButton
            style={styles.textFormat}
            Icon = "history"
            disable={this.state.active.HistoricalEvents}
            title="Historical Events"
            navigateTo={() =>
              this.navigateToScreen('HistoricalEvents', 'Historical Events')
            }
          />
          <DrawerButton
            style={styles.textFormat}
            Icon = "fire"
            disable={this.state.active.Launches}
            title="Launches"
            navigateTo={() => this.navigateToScreen('Launches')}
          />
          <DrawerButton
            style={styles.textFormat}
            Icon = "book-open"
            disable={this.state.active.Missions}
            title="Missions"
            navigateTo={() => this.navigateToScreen('Missions')}
          />
          <DrawerButton
            Icon="car-side"
            style={styles.textFormat}
            disable={this.state.active.TeslaCarDetails}
            title="Tesla Car"
            navigateTo={() =>
              this.navigateToScreen('TeslaCarDetails', 'Tesla Car')
            }
          />
        </View>
        <Image
          source={require('../../assets/img/rocket.gif')}
          style={{marginLeft: 40}}>
        </Image>
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
    paddingLeft: 10,
    paddingBottom: 15,
    fontFamily: 'Christopher-Done',
  },
  spacex: {
    color: '#01142F',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomColor: '#01142F',
    borderBottomWidth: 1,
    fontFamily: 'Christopher-Done',
  }
});

export default Drawer;
