import React, {Component} from 'react';
import {Text, View, ScrollView, RefreshControl, StyleSheet} from 'react-native';

import {getJSONFromApi} from '../../presenter/Presenter';
import {checkNetworkConnection} from '../../utils/NetworkConnectivity';

class TeslaCarDetails extends Component {
  constructor() {
    super();
    this.state = {
      data: {name: 'empty'},
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
          <Text>Roadster info</Text>
          <View>
            <Text style={{marginTop: 40}}>{this.state.data.name}</Text>
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

export default TeslaCarDetails;
