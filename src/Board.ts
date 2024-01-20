import { Shape, shapeToString } from "./shapeutils";
const EMPTY = ".";

class Block implements Shape {
    #block
    constructor(block: string) {
        this.#block = block
    }

    width(): number {
        return 1;
    }
    height(): number {
        return 1;
    }
    blockSpot(row: number, col: number): string | undefined {
        if (row === 0 && col === 0) {
            return this.#block;
        }
    }
}
// MovableShape render each block in Board class
class MovableShape implements Shape {
  #shape: Shape ;
  #row: number;
  #col: number;
  constructor(shape: Shape , row: number, col: number) {
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
          newBlock = new Block(newBlock)
      }this.#falling = new MovableShape(newBlock, 0, Math.floor((this.#width - newBlock.width()))/2)
  }
  width() {
    return this.#width;
  }
  height() {
    return this.#height;
  }
  // Return Block Position with 'blockSpot'
  blockSpot(row: number, col: number): string | undefined {
      if (this.#falling) {
          const block = this.#falling.blockSpot(row, col)
          if (block !== EMPTY) {
              return block
          }
      } return this.#notMoving[row][col];
  }
  // Print board
  toString() {
      return shapeToString(this);
    }
}
