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
import SemiCircleSlider from './SemiCircleSlider';

const App = () => {

  const [colorValue, setColorValue] = useState<number>()

  const hueColors = [
    { color: '#FF0000' },
    { color: '#FF4000' },
    { color: '#FF8000' },
    { color: '#FFBF00' },
    { color: '#FFFF00' },
    { color: '#BFFF00' },
    { color: '#80FF00' },
    { color: '#40FF00' },
    { color: '#00FF00' },
    { color: '#00FF40' },
    { color: '#00FF80' },
    { color: '#00FFBF' },
    { color: '#00FFFF' },
    { color: '#00BFFF' },
    { color: '#0080FF' },
    { color: '#0040FF' },
    { color: '#0000FF' },
    { color: '#4000FF' },
    { color: '#8000FF' },
    { color: '#BF00FF' },
    { color: '#FF00FF' },
    { color: '#FF00BF' },
    { color: '#FF0080' },
    { color: '#FF0040' },
  ];

  const colorChanged = (value: number) => {
    console.log('here is value', value)
    setColorValue(value)
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <SemiCircleSlider
            linearGradient={hueColors}
            thumbColor={'green'}
            trackStrokeWidth={20}
            gestureDisabled={false}
            trackRadius={150}
            circleType={"Top"}
            value={colorValue}
            onValueChange={value => colorChanged(value)}
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
