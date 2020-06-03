import React from 'react';
import {Text, View, StyleSheet, Linking, Dimensions} from 'react-native';

const HistoricalEventDetails = props => {
  return (
    <View style={styles.main}>
      <View>
        <Text style={styles.date}>{props.data.event_date_utc}</Text>
        <Text style={styles.title}>{props.data.title}</Text>
        <Text style={styles.description}>{props.data.details}</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.flexContent}>
            <Text onPress={() => Linking.openURL(props.data.links.article)} style={styles.buttons}>
              Article
            </Text>
          </View>
          <View style={styles.flexContent}>
            <Text onPress={() => Linking.openURL(props.data.links.wikipedia)} style={styles.buttons}>
              Wikipedia
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 28,
    color: '#01142F',
    fontFamily: 'LuckiestGuy-Regular',
    marginTop: 5
  },
  buttons: {
    color: 'white',
    fontFamily: 'LuckiestGuy-Regular',
    fontSize: 20,
    marginVertical: 10
  },
  description:{
    fontSize: 22,
    color: '#01142F',
    fontWeight: 'bold',
    marginVertical: 30,
    marginHorizontal: 15,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: 'rgb(210,210,210)',
    padding: 23
  },
  date:{
    textAlign: "right",
    fontSize: 15,
    marginVertical: 10,
    marginRight: 5,
  },
  flexContent: {
    width: Dimensions.get('window').width / 2,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 12,
    backgroundColor: '#01142F'
  },
  buttonContainer: {
    paddingTop: 10,
    height: Dimensions.get('window').height,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default HistoricalEventDetails;
