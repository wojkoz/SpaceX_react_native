import {AppRegistry} from 'react-native';
import {Navigation} from 'react-native-navigation';
import App from './App';
import TeslaCar from './screens/TeslaCar';

Navigation.registerComponent('Events', () => App);
Navigation.registerComponent('TeslaCar', () => TeslaCar);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Events',
                    passProps: {
                      title: 'Events',
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Events',
                  testID: 'FIRST_TAB_BAR_BUTTON',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'TeslaCar',
                    passProps: {
                      title: 'TeslaCar',
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Tesla Car',
                  testID: 'FIRST_TAB_BAR_BUTTON2',
                },
              },
            },
          },
          //nastepny widok
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'TeslaCar',
                    passProps: {
                      title: 'TeslaCar',
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Tesla Car',
                  testID: 'FIRST_TAB_BAR_BUTTON2',
                },
              },
            },
          },
          //koniec
        ],
      },
    },
  });
});
