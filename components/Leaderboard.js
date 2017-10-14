import React from 'react';
import { View, Text } from 'react-native';
import { css } from '../css/Leaderboard';

class Leaderboard extends React.Component {

  static navigationOptions = { header: null }

  render() {
    return (
      <View style={css.Leaderboard}>
        <Text>Leaderboard</Text>
      </View>
    );
  }
}

export default Leaderboard;
