export interface Shape {
  width(): number;
  height(): number;
  blockSpot(row: number, col: number): string | undefined;
}
export function shapeToString(inShape: Shape) {
  let outShape = "";
  let outShape2 : string = "";
  for (let row = 0; row < inShape.height(); row++) {
    for (let col = 0; col < inShape.width(); col++) {
      outShape += ".";
      outShape2 += inShape.blockSpot(row, col)
    }
    outShape += "\n";
    outShape2 += "\n";
  }
  return outShape;
}
