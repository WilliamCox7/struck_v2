import React from 'react';
import { View, Text } from 'react-native';
import { css } from '../css/Chat';

class Chat extends React.Component {

  static navigationOptions = { header: null }

  render() {
    return (
      <View style={css.Chat}>
        <Text>Chat</Text>
      </View>
    );
  }
}

export default Chat;
