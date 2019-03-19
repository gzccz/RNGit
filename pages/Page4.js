/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';

type Props = {};
export default class Page4 extends Component<Props> {
    static navigationOptions={
        title:'Home',
        headerBackTitle:'返回4'   // 设置返回按钮文案，长度有限制
    }
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Page4!</Text>
                <Button
                    title={'Open Drawer'}
                    onPress={()=>{
                        navigation.openDrawer()
                    }}
                ></Button>
                <Button
                    title={'Close Drawer'}
                    onPress={()=>{
                        navigation.closeDrawer()
                    }}
                ></Button>
                <Button
                    title={'Toggle Drawer'}
                    onPress={()=>{
                        navigation.toggleDrawer()
                    }}
                ></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
