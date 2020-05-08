import React, {Component} from 'react';
import {Text, View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {getJSONFromApi} from '../../presenter/Presenter';

class Missions extends Component {
  constructor() {
    super();
    this.state = {
      data: [{mission_id: 'id1', mission_name: 'empty'}],
    };
    this.observer = {};
  }

  componentDidMount() {
    this.observer = getJSONFromApi('missions').subscribe({
      next: item =>
        this.setState({
          data: item,
        }),
    });
  }

  componentWillUnmount() {
    this.observer.unsubscribe();
  }

  goToDetail = item => {
    Navigation.push('MAIN_STACK', {
      component: {
        name: 'MissionDetails',
        passProps: {
          url: 'missions/' + item.mission_id,
        },
        options: {
          topBar: {
            title: {
              text: item.mission_name,
            },
          },
        },
      },
    });
  };

  render() {
    return (
      <View>
        <Text style={styles.h1}>Missions</Text>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.cardStyle}
              key={item.mission_id}
              onPress={() => this.goToDetail(item)}>
              <Text style={styles.textStyle} key={item.mission_id}>{item.mission_name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.mission_name}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cardStyle: {
    margin: 8,
    padding: 8,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  textStyle:{
    color: '#01142F',
    margin: 15,
    fontSize: 18,
    fontWeight: 'bold'
  },
  h1:{
    color: '#01142F',
    fontWeight: 'bold',
    margin: 15,
    fontSize: 30,
    textAlign: 'center'
  }
});
export default Missions;
