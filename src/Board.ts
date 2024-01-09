export class Board {
  width: number;
  height: number;
  currentBlock: string | undefined;

  constructor(width: number, height: number, currentBlock: string ) {
    this.width = width;
    this.height = height;
    this.currentBlock = currentBlock
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

  drop(block: string) {
    this.currentBlock = block
    return this.currentBlock
  }
}
