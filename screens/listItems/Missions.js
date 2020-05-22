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

class Missions extends Component {
  constructor() {
    super();
    this.state = {
      data: [{mission_id: 'id1', mission_name: 'empty'}],
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
    this.observer = getJSONFromApi('missions').subscribe({
      next: item => {
        this.setState({
          data: item,
        }),
          saveData(keys.list.missions, this.state.data).then();
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
        name: 'MissionDetails',
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
        <Text style={styles.h1}>Missions</Text>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.cardStyle}
              key={item.mission_id}
              onPress={() => this.goToDetail(item)}>
              <Text style={styles.textStyle} key={item.mission_id}>
                {item.mission_name}
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
export default Missions;
