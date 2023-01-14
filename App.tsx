/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
} from 'react-native';
import ColorPickerSlider from './SemiCircleSlider';

const App = () => {

  const [colorValue, setColorValue] = useState<number>()
  const [color, setColor] = useState()

  const colorChanged = (value: number) => {
    //console.log('here is value', value)
    setColorValue(value)
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ColorPickerSlider
            thumbColor={color?.hexColor?? 'grey'}
            trackStrokeWidth={20}
            gestureDisabled={false}
            trackRadius={150}
            circleType={"Top"}
            value={colorValue}
            onValueChange={value => colorChanged(value)}
            onChangeColor={color => setColor(color)}
          />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%', 
    height: '100%', 
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
