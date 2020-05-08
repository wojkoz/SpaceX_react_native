import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';
import {Text, View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
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
        <FlatList
          data={this.state.data}
          renderItem={({item}) => (
              <TouchableOpacity style={styles.cardStyle}
                key={item.id}
                onPress={() => this.goToDetail(item)}>
                <Text style={styles.textStyle} key={item.id}>
                  {item.title}
                </Text>
              </TouchableOpacity>
          )}
          keyExtractor={item => item.title} //? key w flatList musi byc typu string
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
    fontWeight: 'bold',
  },
  h1:{
    color: '#01142F',
    fontWeight: 'bold',
    margin: 15,
    fontSize: 30,
    textAlign: 'center'
  }
});
export default HistoricalEvents;
