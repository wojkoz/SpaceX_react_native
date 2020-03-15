import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import {getJSONFromApi} from '../../presenter/Presenter';

class HistoricalEvents extends Component {
  constructor() {
    super();
    this.state = {
      data: [{id: 0, title: 'pusty', details: 'brak opisu'}],
    };
    this.observer = {};
  }

  componentDidMount() {
    this.observer = getJSONFromApi('history').subscribe({
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
        name: 'HistoricalEventDetails',
        passProps: {
          url: 'history/' + item.id,
        },
        options: {
          topBar: {
            title: {
              text: item.title,
            },
          },
        },
      },
    });
  };

  render() {
    return (
      <View>
        <Text>Historical events list</Text>

        <FlatList
          data={this.state.data}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => this.goToDetail(item)}>
              <Text style={{margin: 20}} key={item.id}>
                {item.title} {item.details}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.title} //? key w flatList musi byc typu string
        />
      </View>
    );
  }
}

export default HistoricalEvents;
