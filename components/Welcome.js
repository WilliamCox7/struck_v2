import React from 'react';
import { View, Text } from 'react-native';
import { css } from '../css/Welcome';

class Welcome extends React.Component {

  static navigationOptions = { header: null }

  render() {
    return (
      <View style={css.Welcome}>
        <Text>Welcome</Text>
      </View>
    );
  }
}

export default Welcome;
