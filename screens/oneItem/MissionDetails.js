import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {getJSONFromApi} from '../../presenter/Presenter';

class MissionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {mission_id: -1, mission_name: 'empty'},
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
        <Text>Mission info</Text>
        <View>
          <Text>{this.state.data.mission_name}</Text>
        </View>
      </View>
    );
  }
}

export default MissionDetails;
