import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {getJSONFromApi} from '../../presenter/Presenter';
import {checkNetworkConnection} from '../../utils/NetworkConnectivity';

class LaunchDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {flight_number: -1, mission_name: 'empty', details: 'empty'},
      isConnected: false,
    };

    this.observer = 0;
  }

  checkConnectionAndFetch() {
    checkNetworkConnection().then(value => {
      this.setState({
        isConnected: value,
      });
      if (this.state.isConnected) {
        this.setDataObserver();
      }
    });
  }

  componentDidMount() {
    this.checkConnectionAndFetch();
  }

  componentDidMount() {
    this.checkConnectionAndFetch();
  }

  setDataObserver() {
    this.observer = getJSONFromApi(this.props.url).subscribe({
      next: item =>
        this.setState({
          data: item,
        }),
    });
  }

  componentWillUnmount() {
    if (this.observer !== 0) {
      this.observer.unsubscribe();
    }
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
