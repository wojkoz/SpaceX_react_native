import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';
import {Text, View, StyleSheet} from 'react-native';
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
      <View style={styles.main}>
        <View>
          <Text>SpaceX</Text>
        </View>
        <View>
          <DrawerButton
            disable={this.state.active.Rockets}
            title="Rockets"
            navigateTo={() => this.navigateToScreen('Rockets')}
          />
          <DrawerButton
            disable={this.state.active.HistoricalEvents}
            title="Historical Events"
            navigateTo={() =>
              this.navigateToScreen('HistoricalEvents', 'Historical Events')
            }
          />
          <DrawerButton
            disable={this.state.active.Launches}
            title="Launches"
            navigateTo={() => this.navigateToScreen('Launches')}
          />
          <DrawerButton
            disable={this.state.active.Missions}
            title="Missions"
            navigateTo={() => this.navigateToScreen('Missions')}
          />
          <DrawerButton
            disable={this.state.active.TeslaCarDetails}
            title="Tesla Car"
            navigateTo={() =>
              this.navigateToScreen('TeslaCarDetails', 'Tesla Car')
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'green',
    padding: 4,
    paddingRight: 12,
    height: '100%',
  },
});

export default Drawer;
