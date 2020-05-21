import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {getJSONFromApi} from '../../presenter/Presenter';
import {checkNetworkConnection} from '../../utils/NetworkConnectivity';

class TeslaCarDetails extends Component {
  constructor() {
    super();
    this.state = {
      data: {name: 'empty'},
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

  setDataObserver() {
    this.observer = getJSONFromApi('roadster').subscribe({
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
        <Text>Roadster info</Text>
        <View>
          <Text style={{marginTop: 40}}>{this.state.data.name}</Text>
        </View>
      </View>
    );
  }
}

export default TeslaCarDetails;
