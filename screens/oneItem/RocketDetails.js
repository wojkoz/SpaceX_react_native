import React from 'react';
import {Text, View, StyleSheet, ScrollView, Linking, Dimensions} from 'react-native';

const RocketDetails = props => {
  return (
    <ScrollView>
      <View>
        <View>
          <Text style={styles.rocketName}>{props.data.rocket_name}</Text>
          <Text style={styles.description}>{props.data.description}</Text>
          <Text style={styles.rocketName}>Details:</Text>
        </View>
        <View>
          <Text style={styles.detailsText}>Cost per launch: {props.data.cost_per_launch}</Text>
          <Text style={styles.detailsText}>First flight: {props.data.first_flight}</Text>
          <Text style={styles.detailsText}>Country: {props.data.country}</Text>
          <Text style={styles.detailsText}>Height: {props.data.height.meters}m</Text>
          <Text style={styles.detailsText}>Diameter: {props.data.diameter.meters},</Text>
          <Text style={styles.detailsText}>Mass: {props.data.mass.kg}kg</Text>
        </View>
        <View>
          <Text style={styles.titles}>First stage</Text>
          <View>
            <Text style={styles.detailsText}>Engines: {props.data.first_stage.engines}</Text>
            <Text style={styles.detailsText}>Fuel in tons: {props.data.first_stage.fuel_amount_tons}</Text>
          </View>
          <View>
            <Text style={styles.titles}>Second stage</Text>
            <View>
              <Text style={styles.detailsText}>Engines: {props.data.second_stage.engines}</Text>
              <Text style={styles.detailsText}>
                Fuel in tons: {props.data.second_stage.fuel_amount_tons}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.titles}>Payloads</Text>
            <View>
              <View>
                <Text style={styles.detailsText}>
                  Height:{' '}
                  {props.data.second_stage.payloads.composite_fairing.height.meters}m
                </Text>
                <Text style={styles.detailsText}>
                  Diameter:{props.data.second_stage.payloads.composite_fairing.diameter.meters}m
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View>
              <Text onPress={() => Linking.openURL(props.data.wikipedia)} style={styles.wikipedia}>
                Wikipedia
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rocketName: {
    textAlign: 'center',
    fontSize: 28,
    color: '#01142F',
    fontFamily: 'LuckiestGuy-Regular',
    marginTop: 5
  },
  description:{
    marginHorizontal: 10,
    fontSize: 18,
    color: '#01142F',
    fontWeight: 'bold',
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
  },
  titles:{
    fontSize: 22,
    color: '#01142F',
    fontFamily: 'LuckiestGuy-Regular',
    marginLeft: 15
  },
  detailsText:{
    fontSize: 16,
    color: '#01142F',
    marginLeft: 18,
    borderBottomWidth: 1,
    marginRight: 30,
    marginBottom: 5,
    paddingBottom: 8
  },
  wikipedia: {
    color: 'white',
    fontFamily: 'LuckiestGuy-Regular',
    fontSize: 25,
    marginVertical: 10,
    marginHorizontal: 40,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 15,
    backgroundColor: '#01142F'
  }
});

export default RocketDetails;
