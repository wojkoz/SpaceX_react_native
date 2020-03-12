import React, {Component} from 'react';
import {Text, View} from 'react-native';
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

  render() {
    return (
      <View>
        <Text>Historical events list</Text>
        <View>
          {this.state.data.map(item => (
            <Text style={{margin: 20}} key={item.id}>
              {item.title} {item.details}
            </Text>
          ))}
        </View>
      </View>
    );
  }
}

export default HistoricalEvents;
