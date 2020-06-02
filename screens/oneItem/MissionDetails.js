import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Linking,
  Dimensions,
} from 'react-native';

const MissionDetails = props => {
  const header = (
    <View>
      <View>
        <Text style={styles.missionTitle}>{props.data.mission_name}</Text>
        <Text style={styles.description}>{props.data.description}</Text>
      </View>
      <View>
        <Text style={styles.titles}>Payload:</Text>
      </View>
    </View>
  );

  const footer = (
    <View style={styles.buttonContainer}>
        <View style={styles.flexContent}>
          <Text onPress={() => Linking.openURL(props.data.wikipedia)} style={styles.buttons}>Wikipedia</Text>
        </View>
        <View style={styles.flexContent}>
          <Text onPress={() => Linking.openURL(props.data.website)} style={styles.buttons}>Website</Text>
        </View>
        <View style={styles.flexContent}>
          <Text onPress={() => Linking.openURL(props.data.twitter)} style={styles.buttons}>Twitter</Text>
        </View>
    </View>
  );

  return (
    <SafeAreaView>
      <FlatList 
        data={props.data.payload_ids}
        renderItem={({item}) => (
          <View>
            <Text style={styles.payloadItems}>-{item}</Text>
          </View>
        )}
        keyExtractor={item => item}
        ListHeaderComponent={header}
        ListFooterComponent={footer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  missionTitle: {
    textAlign: 'center',
    fontSize: 28,
    color: '#01142F',
    fontFamily: 'Christopher-Done',
    marginVertical: 30
  },
  description:{
    marginHorizontal: 10,
    fontSize: 18,
    color: '#01142F',
    fontWeight: 'bold',
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'rgb(210,210,210)'
  },
  titles:{
    fontSize: 22,
    color: '#01142F',
    fontFamily: 'Christopher-Done',
    marginLeft: 15,
    marginTop: 20
  },
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
    marginTop: 15
  },
  buttons: {
    color: 'white',
    fontFamily: 'Christopher-Done',
    fontSize: 18,
  },
  payloadItems:{
    marginLeft: 15,
    fontSize: 15,
    marginVertical: 1
  }
});

export default MissionDetails;
