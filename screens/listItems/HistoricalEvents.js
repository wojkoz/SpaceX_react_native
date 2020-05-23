import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {getJSONFromApi} from '../../presenter/Presenter';
import {checkNetworkConnection} from '../../utils/NetworkConnectivity';
import {loadData, saveData, keys} from '../../utils/Storage';

class HistoricalEvents extends Component {
  constructor() {
    super();
    this.state = {
      data: [{id: 0, title: 'pusty', details: 'brak opisu'}],
      refreshing: false,
      isConnected: false,
    };
    this.observer = 0;
  }

  setDataObserver = () => {
    this.observer = getJSONFromApi('history').subscribe({
      next: item => {
        this.setState({
          data: item,
        }),
          saveData(keys.list.events, this.state.data).then();
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
        name: 'HistoricalEventDetails',
        passProps: {
          data: item,
        },
        options: {
          topBar: {
            title: {
              text: item.title,
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

  checkConnectionAndFetch() {
    checkNetworkConnection().then(value => {
      this.setState({
        isConnected: value,
      });
      if (this.state.isConnected) {
        this.setDataObserver();
      } else {
        loadData(keys.list.events).then(value => {
          this.setState({
            data: value,
          });
        });
      }
    });
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.cardStyle}
              key={item.id + Math.random()}
              onPress={() => this.goToDetail(item)}>
              <Text style={styles.textStyle} key={item.id}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.title}
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
export default HistoricalEvents;
