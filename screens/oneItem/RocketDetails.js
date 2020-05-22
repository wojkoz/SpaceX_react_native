import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const RocketDetails = props => {
  return (
    <View style={styles.main}>
      <Text>Rocket info</Text>
      <View>
        <Text>{props.data.rocket_name}</Text>
        <Text>{props.data.id}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: 50,
  },
});

export default RocketDetails;
