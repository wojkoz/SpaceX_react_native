import React, {Component} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {getJSONFromApi} from '../../presenter/Presenter';

class Launches extends Component {
  constructor() {
    super();
    this.state = {
      data: [{flight_id: -11, mission_name: 'empty', flight_number: -1}],
    };
    this.observer = {};
  }

  componentDidMount() {
    this.observer = getJSONFromApi('launches').subscribe({
      next: item =>
        this.setState({
          data: item,
        }),
    });
  }

  componentWillUnmount() {
    this.observer.unsubscribe();
  }

  goToDetail = item => {
    Navigation.push('MAIN_STACK', {
      component: {
        name: 'LaunchDetails',
        passProps: {
          url: 'launches/' + item.flight_number,
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

  render() {
    return (
      <View>
        <Text>Launches list</Text>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => (
            <TouchableOpacity
              key={Math.random()}
              onPress={() => this.goToDetail(item)}>
              <Text key={Math.random()}>
                {item.mission_name} {item.flight_number}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.mission_name}
        />
      </View>
    );
  }
}

export default Launches;
