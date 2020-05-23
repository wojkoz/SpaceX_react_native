import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Linking,
} from 'react-native';

const MissionDetails = props => {
  const header = (
    <View style={styles.main}>
      <View>
        <Text>{props.data.mission_name}</Text>
        <Text style={{fontSize: 30}}>{props.data.description}</Text>
      </View>
      <View>
        <Text>Payload:</Text>
      </View>
    </View>
  );

  const footer = (
    <View>
      <Text>Links:</Text>
      <View>
        <Text onPress={() => Linking.openURL(props.data.wikipedia)}>
          Wikipedia
        </Text>
        <Text onPress={() => Linking.openURL(props.data.website)}>website</Text>
        <Text onPress={() => Linking.openURL(props.data.twitter)}>twitter</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={props.data.payload_ids}
        renderItem={({item}) => (
          <View>
            <Text>{item}</Text>
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
  main: {
    marginTop: 50,
  },
});

export default MissionDetails;
