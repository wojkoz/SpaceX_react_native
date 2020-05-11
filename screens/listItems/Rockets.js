import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {getJSONFromApi} from '../../presenter/Presenter';
class Rockets extends Component {
  constructor() {
    super();

    this.state = {
      data: [{rocket_id: 'empty', rocket_name: 'empty'}],
      refreshing: false,
    };
    this.observer = {};
  }

  setObserver = () => {
    this.observer = getJSONFromApi('rockets').subscribe({
      next: item =>
        this.setState({
          data: item,
        }),
    });
  };

  componentDidMount() {
    this.setObserver();
  }

  componentWillUnmount() {
    this.observer.unsubscribe();
  }

  goToDetail = item => {
    Navigation.push('MAIN_STACK', {
      component: {
        name: 'RocketDetails',
        passProps: {
          url: 'rockets/' + item.rocket_id,
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

    this.setObserver();

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
    fontWeight: 'bold',
    margin: 15,
    fontSize: 20,
    backgroundColor: '#ccc',
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-around',
  },
  h1: {
    color: '#01142F',
    fontWeight: 'bold',
    margin: 15,
    fontSize: 30,
    textAlign: 'center',
  },
});
export default Rockets;
