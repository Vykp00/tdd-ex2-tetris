import { Shape, shapeToString } from "./shapeutils";
const EMPTY = ".";

class Point {
    row: number;
    col: number;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }
}
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

  // Move Block Down
  blockDescent(): MovableShape {
      return new MovableShape(this.#shape, this.#row + 1, this.#col)
  }

  // Tetris Block Position
  tetrisBlock() {
      const points : any[] = [];
      for (let row: number = this.#row; row < this.#row + this.#shape.height(); row++) {
          for (let col: number = this.#col; col < this.#shape.width(); col++) {
              const block : string | undefined = this.blockSpot(row, col);
              if (block !== EMPTY) {
                  points.push(new Point(row, col));
              }
          }
      }
      return points
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
  #notMoving: string[][];
  #falling: MovableShape | null = null;
  #tickCount: number = 0;

  constructor(width: number, height: number) {
    this.#width = width;
    this.#height = height;
    this.#notMoving = new Array(height);
    for (let row = 0; row < height; row++) {
      this.#notMoving[row] = new Array(width).fill(EMPTY);
    }
  }

  // Drop block
   drop(newBlock: Shape | string) {
      if (typeof newBlock === "string") {
          newBlock = new Block(newBlock)
      } if (this.#falling) {
          throw new Error('already falling')
       }
      this.#falling = new MovableShape(newBlock, 0, Math.floor((this.#width - newBlock.width()))/2)
  }
  tick(): void {
      this.#tickCount +=1
      const step = this.#falling!.blockDescent()
      if (this.#tickCount >= this.height()) {
          this.#stopFalling()
      } else {
          this.#falling = step
      }
  }

  #hitFloor(falling: MovableShape): boolean {
      return true
  }
  #stopFalling() {
      for (let row = 0; row < this.height(); row++) {
          for (let col = 0; col < this.width(); col++) {
              this.#notMoving[row][col] = this.blockSpot(row, col) as string;
          }
      }
      this.#falling = null;
  }
  hasFalling() {
      return this.#falling !== null;
  }
  width(): number {
    return this.#width;
  }
  height(): number {
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
