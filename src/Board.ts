import { Shape, shapeToString } from "./shapeutils";

const EMPTY = ".";

class Point {
    constructor( public row: number, public col: number) {}
}
class Block implements Shape {
    constructor( private readonly block: string) {
    }

    width(): number {
        return 1;
    }
    height(): number {
        return 1;
    }
    blockSpot(row: number, col: number): string | undefined {
        return row === 0 & col === 0 ? this.block : EMPTY;
    }
}
// MovableShape render each block in Board class
class MovableShape implements Shape {
  constructor(private readonly shape: Shape , private readonly row: number, private readonly col: number) {}

  // Move Block Down
  blockDescent(): MovableShape {
      return new MovableShape(this.shape, this.row + 1, this.col)
  }

  // Move Block to Left
  moveLeft(): MovableShape {
    return new MovableShape(this.shape, this.row, this.col -1);
  }

  // Move Block to Right
  moveRight(): MovableShape {
    return new MovableShape(this.shape, this.row, this.col +1);
  }

  // Tetris Block Position
  getBlocks(): Point[] {
      const blocks: Point[] = [];
      for (let row = 0; row < this.shape.height(); row++) {
          for (let col = 0; col < this.shape.width(); col++) {
              if (this.shape.blockSpot(row, col) !== EMPTY) {
                  blocks.push(new Point(this.row + row, this.col + col));
              }
          }
      }
      return blocks;
  }
  // return shape position
  blockSpot(row: number, col: number): string | undefined {
    if (row >= this.row && row < this.height() && col >= this.col && col < this.width()) {
      return this.shape.blockSpot(row - this.row, col - this.col);
    } else {
      return EMPTY;
    }
  }
  height(): number {
    return this.row + this.shape.height();
  }
  width(): number {
    return this.col + this.shape.width();
  }
}
export class Board implements Shape {
  // '#' set hard private
  #width: number;
  #height: number;
  #notMoving: string[][];
  #falling: MovableShape | null = null;

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
      this.#falling = new MovableShape(newBlock, 0, Math.floor((this.#width - newBlock.width())/2))
  }
  tick(): void {
      if (!this.hasFalling()) {
          return;
      }
      const step = this.#falling!.blockDescent()
      if (this.#hitFloor(step) || this.#stopMoving(step)) {
          this.#stopFalling()
      } else {
          this.#falling = step
      }
  }

  moveLeft(): void {
    if (!this.hasFalling()) {
      return;
    }
    const goLeft : MovableShape = this.#falling!.moveLeft();
    if (this.#hitWall(goLeft) || this.#stopMoving(goLeft)) {
      return; // set StopMoving?
    } else {
      this.#falling = goLeft;
    }
  }

  moveRight(): void {
    this.#falling = this.#falling!.moveRight()
  }
  // Player cannot move block to left or right when it hit the wall
  #hitWall(falling: MovableShape): boolean {
    for (const block of falling.getBlocks()) {
      if (block.col >= this.width()) {
        return true;
      }
    }
    return false;
  }
  // Player can still move block until it become immobile
  #hitFloor(falling: MovableShape): boolean {
      for (const block of falling.getBlocks()) {
          if (block.row >= this.height()) {
              return true;
          }
      }
      return false;
  }

  // Block stop moving after hitting bottom
  #stopMoving(falling: MovableShape) {
      for (const block of falling.getBlocks()) {
          if (this.#notMoving[block.row][block.col] !== EMPTY) {
              return true;
          }
      }
      return false;
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
