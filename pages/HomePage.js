
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class HomePage extends Component<Props> {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to HomePage!</Text>

          <Button
            title={'go to page1'}
            onPress={()=>{
              navigation.navigate('Page1',
                  {
                    name:'动态的'
                  }
                  )
            }}
          />
          <Button
              title={'go to page2'}
              onPress={()=>{
                  navigation.navigate('Page2')
              }}
          />
          <Button
              title={'go to page3'}
              onPress={()=>{
                  navigation.navigate('Page3',
                      {name:'devio'}
                      )
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
