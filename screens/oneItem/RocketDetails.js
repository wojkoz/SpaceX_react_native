import React from 'react';
import {Text, View, StyleSheet, ScrollView, Linking} from 'react-native';

const RocketDetails = props => {
  return (
    <ScrollView>
      <View style={styles.main}>
        <View>
          <Text>{props.data.rocket_name}</Text>
          <Text>{props.data.description}</Text>
        </View>
        <View>
          <Text>Cost per launch: {props.data.cost_per_launch}</Text>
          <Text>First flight: {props.data.first_flight}</Text>
          <Text>Country: {props.data.country}</Text>
          <Text>Height: {props.data.height.meters}m</Text>
          <Text>diameter: {props.data.diameter.meters},</Text>
          <Text>Mass: {props.data.mass.kg}kg</Text>
        </View>
        <View>
          <Text>First stage</Text>
          <View>
            <Text>engines: {props.data.first_stage.engines}</Text>
            <Text>fuel in tons: {props.data.first_stage.fuel_amount_tons}</Text>
          </View>
          <View>
            <Text>Second stage</Text>
            <View>
              <Text>engines: {props.data.second_stage.engines}</Text>
              <Text>
                fuel in tons: {props.data.second_stage.fuel_amount_tons}
              </Text>
            </View>
          </View>
          <View>
            <Text>Payloads</Text>
            <View>
              <Text>option 1: {props.data.second_stage.payloads.option_1}</Text>
              <Text>option 2: {props.data.second_stage.payloads.option_2}</Text>
              <Text>composite fairing: </Text>
              <View>
                <Text>
                  height:{' '}
                  {
                    props.data.second_stage.payloads.composite_fairing.height
                      .meters
                  }
                  m
                </Text>
                <Text>
                  diameter:
                  {
                    props.data.second_stage.payloads.composite_fairing.diameter
                      .meters
                  }
                  m
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text>landing legs</Text>
            <View>
              <Text>number: {props.data.landing_legs.number}</Text>
              <Text>material: {props.data.landing_legs.material}</Text>
            </View>
          </View>
          <View>
            <Text>Links:</Text>
            <View>
              <Text onPress={() => Linking.openURL(props.data.wikipedia)}>
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
  main: {
    marginTop: 50,
  },
});

export default RocketDetails;
