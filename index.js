/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {createAppContainer} from 'react-navigation'
// import AppNavigators from './navigators/AppNavigators';
// import {name as appName} from './app.json';
//
// const AppStackNavigatorContainer = createAppContainer(AppNavigators)
// AppRegistry.registerComponent(appName, () => AppStackNavigatorContainer);
//
//
//
// /**
//  * @format
//  * @lint-ignore-every XPLATJSCOPYRIGHT1
//  */
//
// import {AppRegistry} from 'react-native';
// import App from './App';
// import {createAppContainer} from 'react-navigation'
// import AppNavigators from './navigators/AppNavigators';
// import {name as appName} from './app.json';
// import React,{Component} from 'react'
//
//
// import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './redux/store'
//
// const AppStackNavigatorContainer = createAppContainer(AppNavigators);
//
// class NavigationContainer extends Component {
//     render() {
//         return (
//             <Provider store={store}>
//                 <PersistGate persistor={persistor} loading={null}>
//                     <AppContainer/>
//                 </PersistGate>
//             </Provider>
//
//         )
//     }
// }
//
// AppRegistry.registerComponent(appName, () => <NavigationContainer/>);



import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
