import React, {Component} from 'react';
import {Text, View} from 'react-native';

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

  render() {
    return (
      <View>
        <Text>Launches list</Text>
        <View>
          {this.state.data.map(item => (
            <Text key={item.flight_id}>
              {item.mission_name} {item.flight_number}
            </Text>
          ))}
        </View>
      </View>
    );
  }
}

export default Launches;
