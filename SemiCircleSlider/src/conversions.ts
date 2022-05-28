export const interpolate = (
    inputY: number,
    yRange: Array<number>,
    xRange: Array<number>,
) => {
    const [xMin, xMax] = xRange;
    const [yMin, yMax] = yRange;

    const percent = (inputY - yMin) / (yMax - yMin);
    const outputX = percent * (xMax - xMin) + xMin;
    const clamp = (num: number, min: number, max: number) =>
        Math.min(Math.max(num, min), max);

    return clamp(outputX, xMin, xMax);
};

// Angle to x,y coordinate conversion
export const polarToCartesian = (angle: number, cx: number, cy: number, rad: number) => {
    const a = (angle * Math.PI) / 180.0;
    const x = cx - rad * Math.cos(a);
    const y = cy - rad * Math.sin(a);
    return { x, y };
}

export const cartesianToPolar = (x: number, y: number, cx: number, cy: number) => {
    const radians = Math.atan2(cy - y, cx - x);
    const pito2piAngle = radians < 0 ? radians + 2 * Math.PI : radians;
    const piTo2piAngleInDegree = (pito2piAngle * 180) / Math.PI;

    return {
        piTo2piAngleInDegree: Math.round(piTo2piAngleInDegree),
        piToMinuspiAngleInDegree: Math.round((radians * 180) / Math.PI),
    };
}