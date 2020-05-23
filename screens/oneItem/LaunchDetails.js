import React from 'react';
import {Text, View, StyleSheet, ScrollView, Linking} from 'react-native';

const LaunchDetails = props => {
  return (
    <ScrollView>
      <View style={styles.main}>
        <View>
          <Text>Flight numbe: {props.data.flight_number}</Text>
          <Text>Launch year: {props.data.launch_year}</Text>
          <Text>Used rocket: {props.data.rocket.rocket_name}</Text>
          <Text>{props.data.details}</Text>
        </View>
        <View>
          <Text>Links</Text>
          <View>
            <Text onPress={() => Linking.openURL(props.data.links.wikipedia)}>
              Wikipedia
            </Text>
            <Text
              onPress={() => Linking.openURL(props.data.links.article_link)}>
              Article
            </Text>
            <Text
              onPress={() => Linking.openURL(props.data.links.reddit_media)}>
              Reddit
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: 30,
  },
});

export default LaunchDetails;
