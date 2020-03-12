import {Navigation} from 'react-native-navigation';
import App from './App';

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
Navigation.registerComponent('HistoricalEvents', () => App);
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

Navigation.registerComponent('Drawer', () => Drawer);

Navigation.events().registerAppLaunchedListener(() => {
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
                  id: 'Events',
                  name: 'HistoricalEvents',
                },
                options: {
                  //TODO: nie pokazuje tytulu strony glownej
                  topBar: {
                    title: {
                      text: 'Historical Events',
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
});
