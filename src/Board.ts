export class Board {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  // Print board
  toString() {
    let shape = '';
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        shape += '.';
      }
      shape+= '\n'
    }
    return shape;
  }
}
