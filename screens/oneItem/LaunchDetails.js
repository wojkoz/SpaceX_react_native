import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const LaunchDetails = props => {
  return (
    <View style={styles.main}>
      <Text>Launch info</Text>
      <View>
        <Text>{props.data.flight_number}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: 30,
  },
});

export default LaunchDetails;
