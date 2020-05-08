import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {getJSONFromApi} from '../../presenter/Presenter';

class LaunchDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {flight_number: -1, mission_name: 'empty', details: 'empty'},
    };

    this.observer = {};
  }

  componentDidMount() {
    this.observer = getJSONFromApi(this.props.url).subscribe({
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
        <Text>Launch info</Text>
        <View>
          <Text>{this.state.data.flight_number}</Text>
        </View>
      </View>
    );
  }
}

export default LaunchDetails;
