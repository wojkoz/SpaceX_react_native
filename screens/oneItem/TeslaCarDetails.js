import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Linking,
} from 'react-native';

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
          <View>
            <Text style={{marginTop: 40}}>{this.state.data.name}</Text>
            <Text>{this.state.data.details}</Text>
          </View>
          <View>
            <Text>Launch date: {this.state.data.launch_date_utc}</Text>
            <Text>Launch mass: {this.state.data.launch_mass_kg}kg</Text>
            <Text>Orbit type: {this.state.data.orbit_type}</Text>
            <Text>Speed: {this.state.data.speed_kph}km/h</Text>
            <Text>
              Distance from earth: {this.state.data.earth_distance_km}km
            </Text>
            <Text>
              Distance from Mars: {this.state.data.mars_distance_km}km
            </Text>
          </View>
          <View>
            <Text>Links</Text>
            <View>
              <Text onPress={() => Linking.openURL(this.state.data.wikipedia)}>
                Wikipedia
              </Text>
            </View>
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
