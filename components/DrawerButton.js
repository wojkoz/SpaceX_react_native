import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const DrawerButton = props => {
  return (
    <View>
      <TouchableOpacity onPress={props.navigateTo}>
        <Text>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerButton;
