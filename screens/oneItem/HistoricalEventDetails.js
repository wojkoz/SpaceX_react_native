import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {getJSONFromApi} from '../../presenter/Presenter';
import {checkNetworkConnection} from '../../utils/NetworkConnectivity';

class HistoricalEventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {id: -1, title: 'empty', details: 'empty'},
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
        <Text>Historical Event info</Text>
        <View>
          <Text>Title: {this.state.data.title}</Text>
        </View>
      </View>
    );
  }
}

export default HistoricalEventDetails;
