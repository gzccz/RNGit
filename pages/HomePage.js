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
export default class HomePage extends Component<Props> {
    static navigationOptions={
        title:'Home',
        headerBackTitle:'返回'   // 设置返回按钮文案，长度有限制
    }
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Pages11111!</Text>
                <Button
                    title={'go page1'}
                    onPress={()=>{
                        navigation.navigate('Page1',{name:'动态的'})
                    }}
                />
                <Button
                    title={'go page2'}
                    onPress={()=>{
                        navigation.navigate('Page2')
                    }}
                />
                <Button
                    title={'go page3'}
                    onPress={()=>{
                        navigation.navigate('Page3',{name:'Devio'})
                    }}
                />
                <Button
                    title={'go page4'}
                    onPress={()=>{
                        navigation.navigate('Page4',{name:'page4 设置'})
                    }}
                />
                <Button
                    title={'go BottomNavigator'}
                    onPress={()=>{
                        navigation.navigate('Bottom')
                    }}
                />
                <Button
                    title={'go TopNavigator'}
                    onPress={()=>{
                        navigation.navigate('Top')
                    }}
                />
                <Button
                    title={'go DrawerNav'}
                    onPress={()=>{
                        navigation.navigate('DrawerNav')
                    }}
                />
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
