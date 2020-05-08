import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {getJSONFromApi} from '../../presenter/Presenter';

class TeslaCarDetails extends Component {
  constructor() {
    super();
    this.state = {
      data: {name: 'empty'},
    };

    this.observer = {};
  }

  componentDidMount() {
    this.observer = getJSONFromApi('roadster').subscribe({
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
        <Text>Roadster info</Text>
        <View>
          <Text>{this.state.data.name}</Text>
        </View>
      </View>
    );
  }
}

export default TeslaCarDetails;
