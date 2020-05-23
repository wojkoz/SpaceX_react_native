import React from 'react';
import {Text, View, StyleSheet, ScrollView, Linking} from 'react-native';
import Player from '../../components/Player';
const LaunchDetails = props => {
  return (
    <ScrollView>
      <View style={styles.main}>
        <View>
          <Text>Flight number: {props.data.flight_number}</Text>
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
          <View>
            <Player videoID={props.data.links.youtube_id} />
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

export default LaunchDetails;
