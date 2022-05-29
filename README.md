## react-native-semicircle-slider-color-picker

This component is actually a semi circle slider but it is designed in this way that you can use it as color picker too.

<img src="https://github.com/faizqadri234/react-native-semicircle-slider-color-picker/blob/main/SemiCircleSlider/screenshot/screenshot.png" width="375">

## Install

```shell
npm i react-native-semicircle-slider-color-picker
```

## Usage

```jsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  Text, 
  StyleSheet,
} from 'react-native';
import ColorPickerSlider from 'react-native-semicircle-slider-color-picker';

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
```

## Props

Prop                  | Type     | Optional | Default                   | Description
--------------------- | -------- | -------- | ------------------------- | -----------
value                 | number   | Yes      | 0                         | Initial value of the slider
gestureDisabled       | bool     | Yes      | false                     | If true the user won't be able to move the slider
minimumValue          | number   | Yes      | 0                         | Initial minimum value of the slider
maximumValue          | number   | Yes      | 1                         | Initial maximum value of the slider 
trackStrokeWidth      | number   | Yes      | 22                        | This is the width of slider
trackRadius           | number   | Yes      | 150                       | This is the Radius of Circular Slider
thumbRadius           | number   | Yes      | 15                        | This is the Size of Thumb
thumbColor            | string   | Yes      | #fff                      | This is the Color of Thumb 
onValueChange         | Callback | Yes      | none                      | OnChange Handler which returns current slider value 
onChangeColor         | Callback | Yes      | none                      | This callback returns color on change of slider
circleType            | string   | Yes      | Top                       | Required property to draw bottom or top circle (use "Bottom" for bottom circle and "Top" for top circle)
paddingVertical       | number   | Yes      | 20                        | This is the vertical padding 
linearGradient        | any      | Yes      | linearGradient array      | Gradient to fill in the half circle 
paddingVertical       | number   | Yes      | 20                        | This is the vertical padding 
brightness            | number   | Yes      | 100                       | This is the brightness of color, you can also set the brightness based on different slider of brightness. 
---

**MIT Licensed**