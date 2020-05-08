import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {getJSONFromApi} from '../../presenter/Presenter';

class HistoricalEventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {id: -1, title: 'empty', details: 'empty'},
    };
    this.observer = {};
  }

  componentDidMount() {
    this.observer = getJSONFromApi(this.props.url).subscribe({
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
        <Text>Historical Event info</Text>
        <View>
          <Text>Title: {this.state.data.title}</Text>
        </View>
      </View>
    );
  }
}

export default HistoricalEventDetails;
