
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';


type Props = {};
export default class Page1 extends Component<Props> {
    static navigationOptions={
        title:'Home',
        headerBackTitle:'返回'   // 设置返回按钮文案，长度有限制
    }
  render() {
      const {navigation} = this.props;
      return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Page1!</Text>
          <Button
            title={'go back'}
            onPress={()=>{
              navigation.goBack()
            }}
          />
          <Button
              title={'go back'}
              onPress={()=>{
                  navigation.navigate('Page4')
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
  }
});
