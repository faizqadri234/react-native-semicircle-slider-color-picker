/**
 * @author Muhammad Faiz <faizqadri234@gmail.com>
 * This component is actually a semi circle slider but it is designed in this way that you can use it as color picker too
 * This component takes following parameters.
 *
 * @param trackStrokeWidth  - This is the width of slider 
 * @param trackRadius       - This is the Radius of Circular Slider.
 * @param thumbRadius       - This is the Size of Thumb
 * @param thumbColor        - This is the Color of Thumb 
 * @param trackWidth        - This is the Size of Track 
 * @param minValue          - Minimum value 
 * @param maxValue          - Maximum value 
 * @param onValueChange     - OnChange Handler which returns current slider value 
 * @param onChangeColor     - This callback returns color on change of slider
 * @param trackColor        - Color for Track 
 * @param circleType        - Required property to draw bottom or top circle (use "Bottom" for bottom circle and "Top" for top circle)
 * @param paddingVertical   - This is the vertical padding 
 * @param linearGradient    - Gradient to fill in the half circle 
 * @param gestureDisabled   - Gesture enable disable flag 
 * @param brightness        - This is the brightness of color, you can also set the brightness based on different slider of brightness. 
 */
import React from 'react';
import { PanResponder, Animated } from 'react-native';
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import { cartesianToPolar, interpolate, polarToCartesian } from './conversions';
import { SemiCircularSliderProps } from './types';
import colorsys from 'colorsys';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleType = {
  Bottom: "Bottom",
  Top: "Top"
}

const ColorPickerSlider = (props: SemiCircularSliderProps) => {

  const {
    trackRadius = 150,
    value = 0,
    minValue = 0,
    maxValue = 100,
    thumbRadius = 15,
    thumbColor = '#fff',
    trackStrokeWidth = 22,
    trackColor = '#ededed',
    linearGradient = [
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
    ],
    circleType="Top",
    paddingVertical = 20,
    gestureDisabled = false,
    onValueChange,
    onChangeColor,
    brightness=100,
  } = props

  const width: number = trackRadius * 2 + thumbRadius * 2 + trackStrokeWidth / 2;
  const height: number = trackRadius + paddingVertical + trackStrokeWidth;
  const angleOffset: number = 12
  const startAngle: number = circleType === CircleType.Bottom ? angleOffset - 180 : angleOffset;
  const endAngle: number = circleType === CircleType.Bottom ? -angleOffset : 180 - angleOffset;
  const interpolatedAngle = interpolate(
    value,
    [minValue, maxValue],
    circleType === CircleType.Bottom
      ? [180 + angleOffset, 360 - angleOffset]
      : [0 + angleOffset, 180 - angleOffset],
  );

  const compensatePadding = 10;
  const cx = width / 2
  const cy = circleType === CircleType.Bottom ? paddingVertical / 2 - compensatePadding : height - paddingVertical / 2 + compensatePadding
  const rad = trackRadius

  const currentCord = polarToCartesian(Math.round(interpolatedAngle), cx, cy, rad);
  let animatedValue = new Animated.ValueXY({
    x: currentCord.x,
    y: currentCord.y,
  });

  //  Slider thumb movement handler
  const handlePanResponderMove = ({ nativeEvent: { locationX, locationY } }) => {
    if (gestureDisabled) return;
    const {
      piTo2piAngleInDegree,
      piToMinuspiAngleInDegree,
    } = cartesianToPolar(locationX, locationY, cx, cy);
    const { x, y } = polarToCartesian(piTo2piAngleInDegree, cx, cy, rad);

    // Calculate hex color from hsv
    let hexColor = colorsys.hsv2Hex({
      h: interpolate(value, [0, 100], [0, 359]),
      s: 100,
      v: brightness,
    });

    // Calculate Rgb color from hsv
    let rgbColor = colorsys.hsvToRgb({
      h: interpolate(value, [0, 100], [0, 359]),
      s: 100,
      v: brightness,
    });
    // Bottom circle selected value calculation
    if (
      piToMinuspiAngleInDegree <= endAngle &&
      piToMinuspiAngleInDegree >= startAngle &&
      circleType === CircleType.Bottom
    ) {
      animatedValue.setValue({ x, y });
      const updateAngle = interpolate(
        piToMinuspiAngleInDegree,
        [-angleOffset, -180 + angleOffset],
        [minValue, maxValue],
      );
      onChangeColor({hexColor, rgbColor})
      onValueChange(Math.round(updateAngle));
    }
    // Top circle selected value calculation
    else if (
      piToMinuspiAngleInDegree >= startAngle &&
      piTo2piAngleInDegree <= endAngle &&
      circleType === CircleType.Top
    ) {
      animatedValue.setValue({ x, y });
      const updateAngle = interpolate(
        piTo2piAngleInDegree,
        [angleOffset, 180 - angleOffset],
        [minValue, maxValue],
      );
      onChangeColor({hexColor, rgbColor})
      onValueChange(Math.round(updateAngle));
    }
  }
  let _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
  });;

  const startCoord = polarToCartesian(startAngle, cx, cy, rad);
  const endCoord = polarToCartesian(endAngle, cx, cy, rad);

  return (
    <Animated.View>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="gradient">
            {linearGradient?.map((item, index) => (
              <Stop
                key={index}
                offset={
                  item?.offset ||
                  `${index / linearGradient.length}`
                }
                stopColor={item?.color}
                stopOpacity={item?.opacity}
              />
            ))}
          </LinearGradient>
        </Defs>
        <Path
          stroke="url(#gradient)"
          strokeWidth={trackStrokeWidth}
          fill="none"
          d={`M${startCoord.x} ${startCoord.y} A ${rad} ${rad} 1 0 1 ${endCoord.x} ${endCoord.y}`}
          strokeLinecap="round"
        />
        <AnimatedCircle
          cx={animatedValue.x}
          cy={animatedValue.y}
          r={thumbRadius}
          fill={thumbColor}
          {..._panResponder.panHandlers}
        />
      </Svg>
    </Animated.View>
  );
}

export default ColorPickerSlider;
