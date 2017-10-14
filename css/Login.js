import { StyleSheet, Dimensions } from 'react-native';
import { Vars } from './Vars';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export const css = StyleSheet.create({
  Login: {
    flex: 1,
    backgroundColor: Vars.purple,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: width * .41866
  },
  buttonContainer: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    bottom: 50
  },
  button: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 18,
    paddingBottom: 18,
    borderRadius: 50,
    backgroundColor: Vars.dark
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
