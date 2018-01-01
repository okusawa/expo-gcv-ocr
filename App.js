/* -*- mode: web -*- */
/* eslint no-console: 0 */
/* eslint no-undef: 0 */

import React from 'react';
import Dimensions from 'Dimensions';
import { StyleSheet, Image, View, Button, Alert, Clipboard } from 'react-native';
import Reactotron from 'reactotron-react-native';

import { ImagePicker } from 'expo';

import * as VisionApi from './src/apis/vision';
import ApiKey from './src/config/apiKey';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: 400
  },
});

if (__DEV__) {
  require('./src/helpers/reactotron');
}

console.ignoredYellowBox = ['Setting a timer', 'source.uri'];

type State = {
  image: number,
  base64: string,
  enabledPress: boolean
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      base64: null,
      enabledPress: true
    };
    this.onPressPickImage = this.onPressPickImage.bind(this);
    this.onPressOcr = this.onPressOcr.bind(this);
  }

  state: State;

  onPressOcr() {
    const { base64 } = this.state;
    this.setState({ enabledPress: false });
    VisionApi.detectText(ApiKey.vision, base64, (result) => {
      this.setState({ enabledPress: true });

      const response = result.responses[0].fullTextAnnotation;
      Reactotron.log(response);
      const body = response ? response.text : '文字列が見つかりません。';
      Alert.alert(
        'OCR結果',
        body,
        [
          {
            text: 'Copy Clipboard',
            onPress: () => Clipboard.setString(body)
          },
          {
            text: 'close',
          }
        ]
      );
    });
  }

  onPressPickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      // aspect: [4, 3],
      base64: true
    });
    // Reactotron.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri, base64: result.base64 });
    }
  };

  render() {
    const { image, enabledPress } = this.state;
    return (
      <View style={styles.container}>
        <Button
          title="画像を選択してください"
          style={styles.button}
          onPress={this.onPressPickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />}
        {image &&
          <Button
            title="Google Cloud Vision OCR 実行"
            onPress={this.onPressOcr}
            disabled={!enabledPress}
          />}
      </View>
    );
  }
}
