export interface SemiCircularSliderProps {
    /** Radius of Circular Slider */
    trackRadius: number;
    /** Size of Thumb */
    thumbRadius?: number;

    thumbColor?: string;
    /** Size of Track */
    trackWidth?: number;
    /** Value between minValue to maxValue */
    value?: number;
    /** Minimum value */
    minValue: number;
    /** Maximum value */
    maxValue: number;
    /** OnChange Handler */
    onValueChange?: (angle: number) => any;
    /** Color for Track  */
    trackColor?: string;
    trackStrokeWidth: number;
    // Required property to draw bottom or top circle
    circleType: string;
    // This is the vertical padding of slider
    paddingVertical: number;
    // Gradient to fill in the half circle
    linearGradient: Array<object>;
    // Gesture enable disable flag
    gestureDisabled: boolean;
    // This callback returns color on change of slider
    onChangeColor: (color: any) => void
    // This is the brightness of color, you can also set the brightness based on different slider of brightness. 
    brightness?: number
}
