
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';


type Props = {};
export default class Page5 extends Component<Props> {
    static navigationOptions={
        title:'ListView',
        headerBackTitle:'6显示'   // 设置返回按钮文案，长度有限制
    }
  render() {
      const {navigation} = this.props;

      return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Page5!</Text>
          <Button
              title={'go back'}
              onPress={()=>{
                  navigation.navigate('Page6');
              }}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
