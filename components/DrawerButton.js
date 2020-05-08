import React from 'react';
import {Text, TouchableOpacity, View,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DrawerButton = props => {
  const myIcon = <Icon name={props.Icon} size={25} color="#900"/>;
  return (
    <View>
      <TouchableOpacity
        key={Math.random()}
        disabled={props.disable}
        onPress={props.navigateTo}>
          <View style={{flexDirection: "row"}}>
          {myIcon}
          <Text style={props.style}>{props.title}</Text>
          </View>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerButton;
