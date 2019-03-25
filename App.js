import React, {Component} from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store'

import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation'
import Navigator from './navigators/AppNavigators'


// const RootStack = createStackNavigator(
//     {
//         Home,
//         Login,
//     },
//     {
//         initialRouteName: 'Home',
//         defaultNavigationOptions: {
//             header: null
//         }
//     }
// )

const AppContainer = createAppContainer(Navigator);   // createAppContainer  --> ReactNative Component

export default class Navigation extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    <AppContainer/>
                </PersistGate>
            </Provider>

        )
    }
}