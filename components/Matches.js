import React from 'react';
import { View, Text } from 'react-native';
import { css } from '../css/Matches';

class Matches extends React.Component {

  static navigationOptions = { header: null }

  render() {
    return (
      <View style={css.Matches}>
        <Text>Matches</Text>
      </View>
    );
  }
}

export default Matches;
