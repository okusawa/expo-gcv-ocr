/* -*- mode: web -*- */
/* eslint no-console: 0 */
/* eslint no-undef: 0 */

import React from 'react';
import Dimensions from 'Dimensions';
import { StyleSheet, Image, Text, Button, View } from 'react-native';
import Reactotron from 'reactotron-react-native';

import { ImagePicker } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: 400
  }
});

if (__DEV__) {
  require('./src/helpers/reactotron');
}

console.ignoredYellowBox = ['Setting a timer', 'source.uri'];

type State = {
  image: number,
  base64: string
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { image: null, base64: null };
    this.onPressPickImage = this.onPressPickImage.bind(this);
    this.onPressOcr = this.onPressOcr.bind(this);
  }

  state: State;

  onPressOcr() {
    const { base64 } = this.state;
  }

  onPressPickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true,
      // aspect: [4, 3],
      base64: true
    });
     Reactotron.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri, base64: result.base64 });
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
        <Image source={{ uri: image }} style={styles.image} />}
        {image &&
        <Button
          title="execute ocr"
          onPress={this.onPressOcr}
        />}
      </View>
    );
  }
}
