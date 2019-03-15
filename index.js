/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {AppStackNavigator} from './navigators/AppNavigators'
import {createAppContainer} from 'react-navigation'

const AppStackNavigatorContainer = createAppContainer(AppStackNavigator)
AppRegistry.registerComponent(appName, () => AppStackNavigatorContainer);
