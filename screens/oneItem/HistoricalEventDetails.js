import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const HistoricalEventDetails = props => {
  return (
    <View style={styles.main}>
      <Text>Historical Event info</Text>
      <View>
        <Text>Title: {props.data.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: 30,
  },
});

export default HistoricalEventDetails;
