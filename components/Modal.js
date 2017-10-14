import React from 'react';
import { View, Text } from 'react-native';
import { css } from '../css/Modal';

class Modal extends React.Component {

  static navigationOptions = { header: null }

  render() {
    return (
      <View style={css.Modal}>
        <Text>Modal</Text>
      </View>
    );
  }
}

export default Modal;
