import React from 'react';
import {Text, View, StyleSheet, ScrollView, Linking, Dimensions} from 'react-native';
import Player from '../../components/Player';
const LaunchDetails = props => {
  return (
    <ScrollView>
      <View style={styles.main}>
        <Text style={styles.h1}>Launch Info</Text>
        <View style={styles.infoContainer}>
            <View style={styles.flexDetails}>
              <Text style={styles.infoStyles}>Flight number</Text>
            </View>
            <View style={styles.flexDetails}>
              <Text style={styles.infoStyles}>Launch year</Text>
            </View>
            <View style={styles.flexDetails}>
              <Text style={styles.infoStyles}>Used rocket</Text>
            </View>
        </View>
        <View style={styles.infoContainer}>
            <View style={styles.flexDetails}>
              <Text style={styles.infoStyles}>{props.data.flight_number}</Text>
            </View>
            <View style={styles.flexDetails}>
              <Text style={styles.infoStyles}>{props.data.launch_year}</Text>
            </View>
            <View style={styles.flexDetails}>
              <Text style={styles.infoStyles}>{props.data.rocket.rocket_name}</Text>
            </View>
        </View>
        <View style={styles.yt}>
            <Player videoID={props.data.links.youtube_id}/>
        </View>
        <View>
          <Text style={styles.detailsContainer}>{props.data.details}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.flexContent}>
            <Text onPress={() => Linking.openURL(props.data.links.wikipedia)} style={styles.buttons}>
              Wikipedia
            </Text>
          </View>
          <View style={styles.flexContent}>
            <Text style={styles.buttons}
              onPress={() => Linking.openURL(props.data.links.article_link)}>
              Article
            </Text>
          </View>
          <View style={styles.flexContent}>
            <Text style={styles.buttons}
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
  flexContent: {
    width: Dimensions.get('window').width / 3,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 12,
    backgroundColor: '#01142F',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttons: {
    color: 'white',
    fontFamily: 'LuckiestGuy-Regular',
    fontSize: 15,
  },
  main:{
    marginTop: 20
  },
  flexDetails: {
    width: (Dimensions.get('window').width/3)-10,
    alignItems: 'center',
    paddingVertical: 25,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'rgb(210,210,210)',
    borderColor: '#01142F',
  },
  infoContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoStyles: {
    color: '#01142F',
    fontWeight: 'bold',
    fontSize: 15,
  },
  h1:{
    textAlign: 'center',
    fontSize: 28,
    color: '#01142F',
    fontFamily: 'LuckiestGuy-Regular',
    marginVertical: 30
  },
  detailsContainer: {
    fontSize: 18,
    color: '#01142F',
    fontWeight: 'bold',
    marginVertical: 15,
    marginHorizontal: 10
  },
  yt:{
    marginVertical: 10
  }
});

export default LaunchDetails;
