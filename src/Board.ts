import { Shape, shapeToString } from "./shapeutils";
const EMPTY = '.';
class MovableShape implements Shape {
    #shape: Shape;
    #row: number;
    #col: number;
    constructor(shape: Shape, row: number, col: number) {
        this.#shape = shape;
        this.#row = row;
        this.#col = col;
    }
}
export class Board implements Shape {
  // '#' set hard private
  #width: number;
  #height: number;
  #currentBlock: string | null;
  #notMoving: string[][];
  constructor(width: number, height: number, currentBlock: string | null) {
    this.#width = width;
    this.#height = height;
    this.#currentBlock = currentBlock;
    this.#notMoving = new Array(height);
    for (let row = 0; row < height; row++) {
        this.#notMoving[row] = new Array(width).fill(EMPTY)
    }
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
  // Drop block
  drop(block: string) {
    return (this.#currentBlock = block);
  }
}
