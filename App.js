/* -*- mode: web -*- */
/* eslint no-console: 0 */
/* eslint no-undef: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
/* eslint global-require: 0 */

import React from 'react';
import { StyleSheet, Image, Text, Button, View } from 'react-native';

import { ImagePicker } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

if (__DEV__) {
  require('./src/helpers/reactotron');
}

console.ignoredYellowBox = ['Setting a timer', 'source.uri'];

type State = {
  image: number
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { image: null };
    this.onPressPickImage = this.onPressPickImage.bind(this);
  }

  state: State;

  onPressPickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    // Reactotron.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    const { image } = this.state;
    return (
      <View style={styles.container}>
        <Button
          title="Pick an image from camera roll"
          onPress={this.onPressPickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }
}
