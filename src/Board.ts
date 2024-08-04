import { Shape, shapeToString } from "./shapeutils";
import { Tetromino } from "./Tetromino";

const EMPTY = '.';

class Point {
    constructor( public row: number, public col: number) {}
}

export class Block {
  block: string;
  dimension = 1;

  constructor(block : string) {
    this.block = block;
  }

  blockSpot(gridRow: number, gridCol: number) : string | undefined{
    return this.block;
  }

  rotateRight() {
    return this;
  }

  rotateLeft() {
    return this;
  }
}
// MovableShape render each block in Board class
class MovableShape {
  shape: Tetromino;
  shapePosition;

  constructor(shape: Tetromino,
              row: number,
              col: number) {
    this.shape = shape;
    this.shapePosition = { row: row, col: col }; // Initial position
  }

  get row() {
    return this.shapePosition.row;
  }

  get col() {
    return this.shapePosition.col;
  }

  height(): number {
    return this.shape.height();
  }

  width(): number {
    return this.shape.width();
  }

  get dimension(): number {
    return this.shape.dimension;
  }

  get shapeType(): string {
    return this.shape.shapeType;
  }

  // Tetris Block Position to Drop to board
  getBlocks(): Point[] {
    const blocks: Point[] = [];
    for (let row = 0; row < this.shape.height(); row++) {
      for (let col = 0; col < this.shape.width(); col++) {
        if (this.shape.blockSpot(row, col) !== EMPTY) {
          blocks.push(new Point(this.row + row, this.col + col)); // Remove first empty row
        }
      }
    }
    return blocks;
  }

  // return shape position
  blockSpot(gridRow: number, gridCol: number): string | undefined {
    if (
      gridRow >= this.row &&
      gridRow < this.row + this.dimension &&
      gridCol >= this.col &&
      gridCol < this.col + this.dimension
    ) {
      const shapeSpot = this.shape.blockSpot(gridRow - this.row, gridCol - this.col);
      return shapeSpot;
    }
    return EMPTY;
  }

  // Move Block Down
  blockDescent(): void {
    this.shapePosition.row += 1;
  }

  // Move up when kick floor
  moveUp() {
    this.shapePosition.row -= 1;
  }

  // Move Tetromino to left
  moveLeft() {
    this.shapePosition.col -= 1;
  }

  // Move Tetromioe to Right
  moveRight() {
    this.shapePosition.col += 1;
  }

  rotateTetro(direction: number): Tetromino {
    // Rotate Left = 1
    if (direction == 1) {
      return this.shape = this.shape.rotateLeft();
    }
    // Rotate Right = 3
    else if (direction == 3) {
      return this.shape = this.shape.rotateRight()
    }
    return this.shape;
  }
}

function createBlankGrid(width : number, height : number) : string [][] {
  const result = [];

  for (let i = 0; i < height; i++) {
    const row = Array(width).fill(EMPTY);
    result.push(row);
  }

  return result;
}

export class Board implements Shape{
  #grid : string[][];
  #falling: MovableShape | null = null;
  #justFalling : boolean = false; // Verify this Tetromino has just fallen so it should start from the top

  constructor(width : number, height : number) {
    this.#grid = createBlankGrid(width, height);
    this.#justFalling = false;
  }

  width() : number {
    return this.#grid[0].length;
  }

  height() : number  {
    return this.#grid.length;
  }

  hasFalling(): boolean {
    return this.#falling !== null;
  }

  toString(): string {
    return shapeToString(this);
  }

  drop(newBlock: Tetromino | string): void {
    if (this.hasFalling()) {
      throw new Error('already falling')
    }
    if (typeof newBlock === 'string') {
      newBlock = new Block(newBlock)
      this.#falling = new MovableShape(newBlock, 0, Math.floor((this.width() - newBlock.dimension) / 2)); // dimension = 1
      console.log(newBlock)
    }
    if (newBlock instanceof Tetromino) {
      this.#falling = new MovableShape(newBlock, 0, Math.floor((this.width() - newBlock.dimension) / 2));
      this.#justFalling = true; // Verify this is a new block
      const shape = newBlock.currentShape()
      console.log("Drop Tetromino")
      console.table(shape);
      //console.log(shape[0]) // first row of the Tetromino
    }
  }

  // Return Grid with Block position with 'blockSpot'
  blockSpot(row: number, col: number): string | undefined {
    if (this.#falling && !this.#justFalling) {
      const block = this.#falling!.blockSpot(row, col)
      if (block !== EMPTY) {
        return block;
      }
    } if (this.#falling && this.#justFalling) { // Newly droped Tetromino will start from the top
      const block = this.#falling!.blockSpot(row+1, col)
      if (block !== EMPTY) {
        return block
      }
    }
    return this.#grid[row][col];
  }
  tick() : void {
    if (!this.hasFalling()) {
      return;
    }
    if (this.#justFalling) {
      this.#justFalling = false; // Reset to normal once Tetro move down
      return;
    }
    this.#successOrRollBack(this.#falling!.blockDescent.bind(this.#falling), () => {
      this.#kickFloor()
      this.#stopFalling();
    })
  }

  // Tetrominoes can move left. If hit wall it move right
  moveLeft() : void {
    if (!this.hasFalling()) {
      return; // Only falling block can be moved
    }
    this.#successOrRollBack(this.#falling!.moveLeft.bind(this.#falling), this.#falling!.moveRight.bind(this.#falling));
  }

  // Tetrominoes can move right. If hit wall it move left
  moveRight() : void {
    if (!this.hasFalling()) {
      return; // Only falling block can be moved
    }
    this.#successOrRollBack(this.#falling!.moveRight.bind(this.#falling), this.moveLeft.bind(this));
  }

  rotateTetro(direction: number) : void {
    if (!this.hasFalling()) {
      return;
    }
    // Rotation to Left
    if (direction === 1) {
      this.#successOrRollBack(this.#falling!.rotateTetro.bind(this.#falling, 1),
        () => {
        this.#falling!.rotateTetro(3) // Roll back to try Wall Kick
        this.#kickWall(1, 3)
      });
    }
    // Rotating to Right
    if (direction === 3) {
      this.#successOrRollBack(this.#falling!.rotateTetro.bind(this.#falling, 3),
        () => {
          this.#falling!.rotateTetro(1) // Roll back to try Wall Kick
          this.#kickWall(3, 1)
        });
    }
  }

  // Tetrominoe will kick wall to rotate if possible
  #kickWall(initDirection: number, undoDirection: number): void {
    const tryToGoRight : boolean = this.#successOrRollBack(() => {
      this.#falling!.moveRight() // Move to the right to rotate
      this.#falling!.rotateTetro(initDirection)
    }, () => {
      this.#falling!.moveLeft() // Undo Move if failed
      this.#falling!.rotateTetro(undoDirection)
    });
    if (tryToGoRight) {
      console.log("Kick Wall to Right work. Rotating...")
      return; // If move to Right work, return function
    }
    else {
      const tryToGoLeft : boolean = this.#successOrRollBack(() => {
        this.#falling!.moveLeft() // If failed, move to the left to rotate
        this.#falling!.rotateTetro(initDirection)
      }, () => {
        this.#falling!.moveRight() // Undo Move if failed
        this.#falling!.rotateTetro(undoDirection)
      });
      if (tryToGoLeft) {
        console.log("Kick Wall to Left work. Rotating...")
        return; // If kick to left work, return
      }
      else {
        console.log("Wall kick and Rotation failed, Position is the same");
        return;
      }
    }
  }

  // Attempt method. If the move is invalid or fail. Use roll back move
  #successOrRollBack(actionFunction : any, rollbackFunction: any) : false | true {
    actionFunction();
    if (this.#invalidMove()) {
      console.log("Invalid move: -----")
      rollbackFunction();
      return false;
    }
    else {
      console.log("Success move: +++++")
    }
    return true;
  }
  // Tetromino cannot move out the wall
  #hitWall(row: number, col: number) : boolean {
    return this.#falling!.blockSpot(row, col) !== EMPTY && col >= this.width();
  }

  // Tetromino cannot move out of the floor
  #hitFloor(row: number, col: number) : boolean {
    return this.#falling!.blockSpot(row, col) !== EMPTY && row >= this.height();
  }

  // Tetromino hit other block or hit bottom
  #hitBlock(row: number, col: number) : boolean {
    //console.log(`this Block: ${this.#falling!.blockSpot(row, col)} at row: ${row} and col ${col}`);
    return this.#falling!.blockSpot(row, col) !== EMPTY && this.getBlock(row, col) !== EMPTY;
  }

  getBlock(row: number, col: number): string {
    console.log(`Grid spot ${this.#grid[row][col]} at at row: ${row} and col ${col}`)
    return this.#grid[row][col]
  }

  #invalidMove(): true | false {
    for (let row = this.#falling!.row; row < this.#falling!.row + this.#falling!.dimension; row++) {
      for (let col = this.#falling!.col; col < this.#falling!.col + this.#falling!.dimension; col++) {
        if (this.#hitWall(row, col) || this.#hitFloor(row, col) || this.#hitBlock(row, col)) {
          if(this.#hitWall(row, col)) {
            console.log("Tetro Hit Wall")
          }
          else if(this.#hitFloor(row, col)) {
            console.log("Tetro Hit Floor")
          }
          else if (this.#hitBlock(row, col)) {
            console.log("Tetro Hit Block")
          }
          return true;
        }
      }
    }
    return false
  }

  // Block stop moving after hitting bottom
  // Tetromino Move up
  #kickFloor() {
    console.log("Move Up Work");
    this.#falling!.moveUp();
  }
  #stopFalling(): void {
    this.#justFalling = false; // Tetromino to normal shape as it's not newly dropped anymore
    for (let row = 0; row < this.height(); row++) {
      for (let col = 0; col < this.width(); col++) {
        this.#grid[row][col] = this.blockSpot(row, col) as string;
      }
    }
    console.log("stopFalling activated")
    console.table(this.#grid)
    this.#falling = null;
  }
}

