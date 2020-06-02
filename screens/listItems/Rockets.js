import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  RefreshControl,
  ImageBackground
} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {checkNetworkConnection} from '../../utils/NetworkConnectivity';
import {getJSONFromApi} from '../../presenter/Presenter';
import {loadData, saveData, keys} from '../../utils/Storage';
class Rockets extends Component {
  constructor() {
    super();

    this.state = {
      data: [{rocket_id: 'empty', rocket_name: 'empty'}],
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
    this.observer = getJSONFromApi('rockets').subscribe({
      next: item => {
        this.setState({
          data: item,
        }),
          saveData(keys.list.rockets, this.state.data).then();
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
        name: 'RocketDetails',
        passProps: {
          data: item,
        },
        options: {
          topBar: {
            title: {
              text: item.rocket_name,
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
        <Text style={styles.h1}>Rockets</Text>
        <FlatList
          columnWrapperStyle={styles.row}
          numColumns="2"
          data={this.state.data}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.cardStyle}
              key={item.rocket_id}
              onPress={() => this.goToDetail(item)}>
              <Text style={styles.textStyle} key={item.rocket_id}>
                {item.rocket_name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.rocket_name}
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
    margin: 3,
    padding: 8,
    textAlign: 'center',
    backgroundColor: '#ccc',
    width: Dimensions.get('window').width / 2 - 20,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 35,
  },
  textStyle: {
    color: '#01142F',
    margin: 15,
    fontSize: 20,
    backgroundColor: '#ccc',
    textAlign: 'center',
    fontFamily: 'LuckiestGuy-Regular',
  },
  row: {
    justifyContent: 'space-around',
  },
  h1: {
    color: '#01142F',
    margin: 15,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'LuckiestGuy-Regular'
  },
});
export default Rockets;
