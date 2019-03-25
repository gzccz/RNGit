
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';

export default class Page6 extends Component {
    static navigationOptions={
        headerTitle:'ListView2',
        headerBackTitle:'1'   // 设置返回按钮文案，长度有限制
    }
  render() {
      const {navigation} = this.props;

      return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Page6!</Text>
          <Button
            onPress={()=>{
                navigation.navigate('Areas',{city_id:1111})
            }}
            title={'test'}
          >

          </Button>
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
