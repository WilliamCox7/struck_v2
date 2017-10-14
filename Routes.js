import { StackNavigator } from 'react-navigation';

import Login from './components/Login';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Request from './components/Request';
import Matches from './components/Matches';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import Chat from './components/Chat';
import Settings from './components/Settings';

export const Routes = StackNavigator({
  Login: {
    screen: Login
  },
  Welcome: {
    screen: Welcome
  },
  Home: {
    screen: Home
  },
  Request: {
    screen: Request
  },
  Matches: {
    screen: Matches
  },
  Leaderboard: {
    screen: Leaderboard
  },
  Profile: {
    screen: Profile
  },
  Chat: {
    screen: Chat
  },
  Settings: {
    screen: Settings
  }
}, {
  headerMode: 'screen'
});
