import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {getJSONFromApi} from '../../presenter/Presenter';

class RocketDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {rocket_id: -1, rocket_name: 'empty'},
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
        <Text>Rocket info</Text>
        <View>
          <Text>{this.state.data.rocket_name}</Text>
        </View>
      </View>
    );
  }
}

export default RocketDetails;
