import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {getJSONFromApi} from '../../presenter/Presenter';

class Rockets extends Component {
  constructor() {
    super();

    this.state = {
      data: [{rocket_id: 'empty', rocket_name: 'empty'}],
    };
    this.observer = {};
  }

  componentDidMount() {
    this.observer = getJSONFromApi('rockets').subscribe({
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

  render() {
    return (
      <View>
        <Text>Rockets list</Text>
        <View>
          {this.state.data.map(item => (
            <TouchableOpacity
              key={item.rocket_id}
              onPress={() => this.goToDetail(item)}>
              <Text key={item.rocket_id}>{item.rocket_name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

export default Rockets;
