/* -*- mode: web -*- */
/* eslint no-console: 0 */
/* eslint no-undef: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
/* eslint global-require: 0 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

if (__DEV__) {
  require('./src/helpers/reactotron');
  const Reactotron = require('reactotron-react-native').default;
  Reactotron.log('unko');
}

console.ignoredYellowBox = ['Setting a timer', 'source.uri'];

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}
