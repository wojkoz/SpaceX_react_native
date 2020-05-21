import React, {Component} from 'react';
import {Text, View, ScrollView, RefreshControl, StyleSheet} from 'react-native';

import {getJSONFromApi} from '../../presenter/Presenter';
import {checkNetworkConnection} from '../../utils/NetworkConnectivity';

class LaunchDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {flight_number: -1, mission_name: 'empty', details: 'empty'},
      isConnected: false,
      refreshing: false,
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

  onMyRefresh = () => {
    this.setState({
      refreshing: true,
    });

    this.checkConnectionAndFetch();

    this.setState({
      refreshing: false,
    });
  };

  render() {
    return (
      <View style={styles.main}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onMyRefresh}
            />
          }>
          <Text>Launch info</Text>
          <View>
            <Text>{this.state.data.flight_number}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    marginTop: 30,
  },
});

export default LaunchDetails;
