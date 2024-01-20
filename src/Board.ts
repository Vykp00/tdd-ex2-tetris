import { Shape, shapeToString } from "./shapeutils";
const EMPTY = ".";
// MovableShape render each block in Board class
class MovableShape implements Shape {
  #shape: Shape | string;
  #row: number;
  #col: number;
  constructor(shape: Shape | string, row: number, col: number) {
    this.#shape = shape;
    this.#row = row;
    this.#col = col;
  }
  // return shape position
  blockSpot(row: number, col: number): string | undefined {
    if (row >= this.#row && row < this.height() && col >= this.#col && col < this.width()) {
      return this.#shape.blockSpot(row - this.#row, col - this.#col);
    } else {
      return EMPTY;
    }
  }
  height(): number {
    return this.#row + this.#shape.height();
  }
  width(): number {
    return this.#col + this.#shape.width();
  }
}
export class Board implements Shape {
  // '#' set hard private
  #width: number;
  #height: number;
  #currentBlock: string | null;
  #notMoving: string[][];
  #falling: MovableShape | null = null;

  constructor(width: number, height: number, currentBlock: string | null) {
    this.#width = width;
    this.#height = height;
    this.#currentBlock = currentBlock;
    this.#notMoving = new Array(height);
    for (let row = 0; row < height; row++) {
      this.#notMoving[row] = new Array(width).fill(EMPTY);
    }
  }

  // Drop block
   drop(newBlock: Shape | string) {
      if (typeof newBlock === "string") {
          this.#falling = new MovableShape(newBlock, 0, Math.floor((this.#width - 1))/2)
      }
      return (this.#currentBlock = newBlock);
  }
  width() {
    return this.#width;
  }
  height() {
    return this.#height;
  }
  // Return Block Position with 'blockSpot'
  blockSpot(row: number, col: number): string | undefined {
    return this.#notMoving[row][col];
  }
  // Print board
  toString() {
    if (typeof this.#currentBlock === "string") {
      let outBlock: string = `.${this.#currentBlock}.\n`;
      this.#height = this.#height - 1;
      outBlock += shapeToString(this);
      return outBlock;
    } else {
      return shapeToString(this);
    }
  }
}
