import React from 'react';
import { View, Text } from 'react-native';
import { css } from '../css/Profile';

class Profile extends React.Component {

  static navigationOptions = { header: null }

  render() {
    return (
      <View style={css.Profile}>
        <Text>Profile</Text>
      </View>
    );
  }
}

export default Profile;
