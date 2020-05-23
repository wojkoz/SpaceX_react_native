import React from 'react';
import {Text, View, StyleSheet, Linking} from 'react-native';

const HistoricalEventDetails = props => {
  return (
    <View style={styles.main}>
      <View>
        <Text>Title: {props.data.title}</Text>
        <Text>date: {props.data.event_date_utc}</Text>
        <Text>date: {props.data.flight_number}</Text>
        <Text>date: {props.data.details}</Text>
        <View>
          <Text onPress={() => Linking.openURL(props.data.links.article)}>
            Article
          </Text>
          <Text onPress={() => Linking.openURL(props.data.links.wikipedia)}>
            Wikipedia
          </Text>
        </View>
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
