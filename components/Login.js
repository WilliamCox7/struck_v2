import React from 'react';
import { Text, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { css } from '../css/Login';
import Modal from './Modal';

class Login extends React.Component {

  static navigationOptions = { header: null }

  constructor() {
    super();
    this.auth = this.auth.bind(this);
  }

  componentDidMount() {
    //this.props.navigation.navigate('Home');
  }

  auth() {
    //this is where I authorize with fb and get fb info back
    this.openModal({
      image: require('../src/profile.jpg'),
      name: 'William'
    });
  }

  openModal(fb) {

  }

  render() {
    return (
      <View style={css.Login}>
        <Image style={css.logo} resizeMode="contain"
          source={require('../src/logo.png')} />
        <View style={css.buttonContainer}>
          <TouchableOpacity style={css.button} activeOpacity={0.9}
            onPress={this.auth}>
            <Text style={css.buttonText}>Login with Facebook</Text>
          </TouchableOpacity>
        </View>
        <Modal />
      </View>
    );
  }
}

export default Login;
