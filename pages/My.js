/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,Image} from 'react-native';

export default class My extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text>
                    作者：狗子村村长
                </Text>
                <Text>
                    邮箱：357846077@qq.com
                </Text>

                <Text style={{marginTop:50}}>小程序作品</Text>

               <Image
                   style={{marginTop:20}}
                   source={require('../asset/images/common/WechatXcx.jpg')}
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
