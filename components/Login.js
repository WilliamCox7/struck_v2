import React from 'react';
import { connect } from 'react-redux';
import { Linking, Text, View, Image, TouchableOpacity, AsyncStorage, Platform } from 'react-native';
import SafariView from 'react-native-safari-view';
import { setUser } from '../redux/user';
import { css } from '../css/Login';
import config from '../config';
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
    if (!this.props.user.id) {
      axios.get(config.API + '/auth/me').then((response) => {
        console.log(response);
      });
    } else {
      console.log(this.props.user);
    }
    Linking.addEventListener('url', this.handleOpenURL);
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  };

  handleOpenURL({ url }) {
    const [, user_string] = url.match(/user=([^#]+)/);
    var user = JSON.parse(decodeURI(user_string));
    this.setState({
      user: user
    });
    console.log(user);
    this.props.setUser(user);
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  openURL(url) {
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    } else {
      Linking.openURL(url);
    }
  };

  auth() {
    this.openURL(config.API + '/auth/facebook');
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
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setUser: setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
