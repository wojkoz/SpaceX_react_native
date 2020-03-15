import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const DrawerButton = props => {
  return (
    <View>
      <TouchableOpacity
        key={Math.random()}
        disabled={props.disable}
        onPress={props.navigateTo}>
        <Text>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerButton;
