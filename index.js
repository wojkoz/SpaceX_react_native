//!dokumentacja SpaceX APi
//https://docs.spacexdata.com/?version=latest#9211ff07-9f81-41ac-9568-3018dd043e2a

import {Navigation} from 'react-native-navigation';
import App from './App';

import HistoricalEvents from './screens/listItems/HistoricalEvents';
import Launches from './screens/listItems/Launches';
import Missions from './screens/listItems/Missions';
import Rockets from './screens/listItems/Rockets';

import HistoricalEventDetails from './screens/oneItem/HistoricalEventDetails';
import LaunchDetails from './screens/oneItem/LaunchDetails';
import MissionDetails from './screens/oneItem/MissionDetails';
import RocketDetails from './screens/oneItem/RocketDetails';
import TeslaCarDetails from './screens/oneItem/TeslaCarDetails';

import Drawer from './screens/drawer/Drawer';

//list
Navigation.registerComponent('HistoricalEvents', () => HistoricalEvents);
Navigation.registerComponent('Launches', () => Launches);
Navigation.registerComponent('Missions', () => Missions);
Navigation.registerComponent('Rockets', () => Rockets);
//one item details
Navigation.registerComponent(
  'HistoricalEventDetails',
  () => HistoricalEventDetails,
);
Navigation.registerComponent('LaunchDetails', () => LaunchDetails);
Navigation.registerComponent('MissionDetails', () => MissionDetails);
Navigation.registerComponent('RocketDetails', () => RocketDetails);
Navigation.registerComponent('TeslaCarDetails', () => TeslaCarDetails);
Navigation.registerComponent('HomePage', () => App);
Navigation.registerComponent('Drawer', () => Drawer);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      elevation: 0,
      visible: true,
      drawBehind: true,
      animate: false,
      borderHeight: 1,
      leftButtons: [
        {
          icon: require('./assets/img/Hamburger_icon.png'),
          id: 'drawerButton',
        },
      ],
      title: {
        color: 'white',
        alignment: 'center',
        text: 'Home',
      },
      background: {
        color: 'gray',
      },
    },
  });

  Navigation.setRoot({
    root: {
      sideMenu: {
        id: 'sideMenu',
        left: {
          component: {
            id: 'drawerId',
            name: 'Drawer',
          },
        },
        center: {
          stack: {
            id: 'MAIN_STACK',
            children: [
              {
                component: {
                  name: 'HomePage',
                  options: {
                    topBar: {
                      title: {
                        text: 'Home Page',
                      },
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  });

  Navigation.events().registerNavigationButtonPressedListener(() => {
    Navigation.mergeOptions('drawerId', {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    });
  });
});
