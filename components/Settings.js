import React from 'react';
import { View, Text } from 'react-native';
import { css } from '../css/Settings';

class Settings extends React.Component {

  static navigationOptions = { header: null }

  render() {
    return (
      <View style={css.Settings}>
        <Text>Settings</Text>
      </View>
    );
  }
}

export default Settings;
