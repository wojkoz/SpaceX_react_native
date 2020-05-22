import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {checkNetworkConnection} from '../../utils/NetworkConnectivity';
import {getJSONFromApi} from '../../presenter/Presenter';
import {loadData, saveData, keys} from '../../utils/Storage';

class Launches extends Component {
  constructor() {
    super();
    this.state = {
      data: [{flight_id: -11, mission_name: 'empty', flight_number: -1}],
      refreshing: false,
      isConnected: false,
    };
    this.observer = 0;
  }

  checkConnectionAndFetch() {
    checkNetworkConnection().then(value => {
      this.setState({
        isConnected: value,
      });
      if (this.state.isConnected) {
        this.setDataObserver();
      } else {
        loadData(keys.list.rockets).then(value => {
          this.setState({
            data: value,
          });
        });
      }
    });
  }

  setDataObserver = () => {
    this.observer = getJSONFromApi('launches').subscribe({
      next: item => {
        this.setState({
          data: item,
        }),
          saveData(keys.list.launches, this.state.data).then();
      },
    });
  };

  componentDidMount() {
    this.checkConnectionAndFetch();
  }

  componentWillUnmount() {
    if (this.observer !== 0) {
      this.observer.unsubscribe();
    }
  }

  goToDetail = item => {
    Navigation.push('MAIN_STACK', {
      component: {
        name: 'LaunchDetails',
        passProps: {
          data: item,
        },
        options: {
          topBar: {
            title: {
              text: item.mission_name,
            },
          },
        },
      },
    });
  };

  myOnRefresh = () => {
    this.setState({
      refreshing: true,
    });

    this.checkConnectionAndFetch();

    this.setState({
      refreshing: false,
    });
  };

  render() {
    return (
      <View>
        <Text style={styles.h1}>Launches</Text>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.cardStyle}
              key={Math.random()}
              onPress={() => this.goToDetail(item)}>
              <Text key={Math.random()} style={styles.textStyle}>
                {item.mission_name} {item.flight_number}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.mission_name}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.myOnRefresh}
            />
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cardStyle: {
    margin: 8,
    padding: 8,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  textStyle: {
    color: '#01142F',
    margin: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  h1: {
    color: '#01142F',
    fontWeight: 'bold',
    margin: 15,
    fontSize: 30,
    textAlign: 'center',
  },
});
export default Launches;
