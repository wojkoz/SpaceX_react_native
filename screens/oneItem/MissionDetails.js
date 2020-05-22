import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const MissionDetails = props => {
  return (
    <View style={styles.main}>
      <Text>Mission info</Text>
      <View>
        <Text>{props.data.mission_name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: 30,
  },
});

export default MissionDetails;
