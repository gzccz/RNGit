
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';


type Props = {};
export default class Page6 extends Component<Props> {
    static navigationOptions={
        headerTitle:'ListView2',
        headerBackTitle:'1'   // 设置返回按钮文案，长度有限制
    }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Page6!</Text>
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
  }
});
