import React from 'react';
import { Linking, Text, View, Image, TouchableOpacity, AsyncStorage, Platform } from 'react-native';
import SafariView from 'react-native-safari-view';
import { css } from '../css/Login';
import Modal from './Modal';
import axios from 'axios';

class Login extends React.Component {

  static navigationOptions = { header: null }

  constructor() {
    super();
    this.state = {
      user: undefined
    }
    this.auth = this.auth.bind(this);
    this.openURL = this.openURL.bind(this);
    this.handleOpenURL = this.handleOpenURL.bind(this);
  }

  componentDidMount() {
    //this.props.navigation.navigate('Home');
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  }

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  };

  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      // Decode the user string and parse it into JSON
      user: JSON.parse(decodeURI(user_string))
    });
    console.log(JSON.parse(decodeURI(user_string)));
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  openURL = (url) => {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };

  auth() {
    this.openURL('http://192.168.127.143:3000/auth/fb');
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
