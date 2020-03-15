import React, {Component} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
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
        <Text>Missions list</Text>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.mission_id}
              onPress={() => this.goToDetail(item)}>
              <Text key={item.mission_id}>{item.mission_name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.mission_name}
        />
      </View>
    );
  }
}

export default Missions;
