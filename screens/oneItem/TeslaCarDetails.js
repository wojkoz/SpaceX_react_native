import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Linking,
  Dimensions,
} from 'react-native';

import {getJSONFromApi} from '../../presenter/Presenter';
import {checkNetworkConnection} from '../../utils/NetworkConnectivity';
import {loadData, saveData, keys} from '../../utils/Storage';

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
      } else {
        loadData(keys.list.roadster).then(value => {
          this.setState({
            data: value,
          });
        });
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
    saveData(keys.list.roadster, this.state.data).then();
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
      <View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onMyRefresh}
            />
          }>
          <View>
            <Text style={styles.title}>{this.state.data.name}</Text>
            <Text style={styles.description}>{this.state.data.details}</Text>
          </View>
          <View>
          <View style={styles.infoContainer}>
            <View style={styles.flexProps}>
              <Text style={styles.props}>Launch date</Text>
            </View>
            <View style={styles.flexProps}>
              <Text style={styles.props}>Launch mass</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.flexValues}>
              <Text style={styles.values}>{this.state.data.launch_date_utc}</Text>
            </View>
            <View style={styles.flexValues}>
              <Text style={styles.values}>{this.state.data.launch_mass_kg}kg</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.flexProps}>
              <Text style={styles.props}>Orbit type</Text>
            </View>
            <View style={styles.flexProps}>
              <Text style={styles.props}>Speed</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.flexValues}>
              <Text style={styles.values}>{this.state.data.orbit_type}</Text>
            </View>
            <View style={styles.flexValues}>
              <Text style={styles.values}>{this.state.data.speed_kph}km/h</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.flexProps}>
              <Text style={styles.props}>Distance from earth</Text>
            </View>
            <View style={styles.flexProps}>
              <Text style={styles.props}>Distance from Mars</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.flexValues}>
              <Text style={styles.values}>{this.state.data.earth_distance_km}km</Text>
            </View>
            <View style={styles.flexValues}>
              <Text style={styles.values}>{this.state.data.mars_distance_km}km</Text>
            </View>
          </View>
            <View>
              <Text onPress={() => Linking.openURL(this.state.data.wikipedia)} style={styles.wikipedia}>
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
  title: {
    textAlign: 'center',
    fontSize: 28,
    color: '#01142F',
    fontFamily: 'Christopher-Done',
    marginVertical: 30
  },
  description:{
    marginHorizontal: 10,
    fontSize: 18,
    color: '#01142F',
    fontWeight: 'bold',
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'rgb(210,210,210)',
    marginBottom: 15
  },
  infoContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flexProps: {
    width: Dimensions.get('window').width /2-10,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 12,
    backgroundColor: '#01142F',
    marginHorizontal: 5
  },
  flexValues: {
    width: Dimensions.get('window').width /2-10,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 12,
    backgroundColor: 'rgb(210,210,210)',
    marginHorizontal: 5
  },
  props: {
    color: 'white',
    fontFamily: 'Christopher-Done',
  },
  values: {
    color: '#01142F',
    fontWeight: 'bold'
  },
  wikipedia: {
    color: 'white',
    fontFamily: 'Christopher-Done',
    fontSize: 25,
    marginTop: 10,
    textAlign: 'center',
    borderWidth: 1,
    paddingVertical: 15,
    backgroundColor: '#01142F'
  }
});

export default TeslaCarDetails;
