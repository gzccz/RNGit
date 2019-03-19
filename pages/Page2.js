
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,ScrollView} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Page2 extends Component<Props> {
  render() {
      const {navigation} = this.props;
      return (
      <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to Page2!</Text>

        <ScrollView>

            <Text style={styles.welcome}>Welcome to Page2!</Text>
              <Button
                  title={'go back'}
                  onPress={()=>{
                      navigation.navigate('Page6');
                  }}
              />
            <Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            />
            <Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            />
            <Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            /><Text style={styles.welcome}>Welcome to Page2!</Text>
            <Button
                title={'go back'}
                onPress={()=>{
                    navigation.navigate('Page6');
                }}
            />


          </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
