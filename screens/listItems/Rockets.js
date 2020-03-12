import React, {Component} from 'react';
import {Text, View} from 'react-native';

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

  render() {
    return (
      <View>
        <Text>Rockets list</Text>
        <View>
          {this.state.data.map(item => (
            <Text key={item.rocket_id}>{item.rocket_name}</Text>
          ))}
        </View>
      </View>
    );
  }
}

export default Rockets;
