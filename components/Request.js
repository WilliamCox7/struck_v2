import React from 'react';
import { View, Text } from 'react-native';
import { css } from '../css/Request';

class Request extends React.Component {

  static navigationOptions = { header: null }

  render() {
    return (
      <View style={css.Request}>
        <Text>Request</Text>
      </View>
    );
  }
}

export default Request;
