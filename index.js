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

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              // id: 'component1', // Optional, Auto generated if empty
              name: 'HistoricalEvents',
            },
          },
        ],
      },
    },
  });
});
