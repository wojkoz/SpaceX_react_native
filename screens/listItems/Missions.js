import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {getJSONFromApi} from '../../presenter/Presenter';

class Missions extends Component {
  constructor() {
    super();
    this.state = {
      data: [{mission_id: 'id1', mission_name: 'empty'}],
    };
    this.observer = {};
  }

  componentDidMount() {
    this.observer = getJSONFromApi('missions').subscribe({
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
        <Text>Missions list</Text>
        <View>
          {this.state.data.map(item => (
            <Text key={item.mission_id}>{item.mission_name}</Text>
          ))}
        </View>
      </View>
    );
  }
}

export default Missions;
