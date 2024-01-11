export interface Shape {
    width: number;
    height: number
}
export function shapeToString(inShape: Shape) {
    let outShape = '';
    for (let row = 0; row < inShape.height; row++) {
        for (let col = 0; col < inShape.width; col++) {
        outShape += '.';
        }
        outShape+= '\n'
    }
    return outShape;
}