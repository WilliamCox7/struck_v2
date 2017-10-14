import React from 'react';
import { View, Text } from 'react-native';
import { css } from '../css/Home';

class Home extends React.Component {

  static navigationOptions = { header: null }

  render() {
    return (
      <View style={css.Home}>
        <Text>Home</Text>
      </View>
    );
  }
}

export default Home;
