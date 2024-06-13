import { Shape, shapeToString } from "./shapeutils";
import { Tetromino, Tetromino2 } from "./Tetromino";

const EMPTY = '.';

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
        return row === 0 && col === 0 ? this.block : EMPTY;
    }
}

export class Block2 {
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
class MovableShape implements Shape {
  constructor(private readonly shape: Tetromino , private readonly row: number, private readonly col: number) {}

  // Move Block Down
  blockDescent(): MovableShape {
      return new MovableShape(this.shape, this.row + 1, this.col)
  }

  // Move Block to Left
  moveLeft(): MovableShape {
    return new MovableShape(this.shape, this.row, this.col -1);
  }

  rotateTetro( direction:number ): MovableShape {
    // Rotate Left = 1
    if (direction == 1) {
      return new MovableShape(this.shape.rotateLeft(), this.row, this.col)
    }
    // Rotate Right = 3
    else if (direction == 3) {
      return new MovableShape(this.shape.rotateRight(), this.row, this.col)
    }
    return new MovableShape(this.shape, this.row, this.col)
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
      if (row >= this.row && row < this.row + this.shape.height() && col >= this.col && col < this.col + this.shape.width()) {
          return this.shape.blockSpot(row - this.row, col - this.col);
      }
      return EMPTY;
  }
  height(): number {
    return this.shape.height();
  }
  width(): number {
    return this.shape.width();
  }
}

class MovableShape2 {
  shape: Tetromino2;
  shapePosition;
  constructor(shape: Tetromino2 ,
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
    console.log("getBlock()")
    console.table(blocks)
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
      const shapeSpot= this.shape.blockSpot(gridRow - this.row, gridCol - this.col);
      return shapeSpot;
    }
    return EMPTY;
  }

  // Move Block Down
  blockDescent() : void {
    this.shapePosition.row += 1;
  }

  // Move up when kick floor
  moveUp(){
    this.shapePosition.row -=1;
  }

  // Move Tetromino to left
  moveLeft() {
    this.shapePosition.col -= 1;
  }

  // Move Tetromioe to Right
  moveRight() {
    this.shapePosition.col += 1;
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

export class Board2 implements Shape{
  #grid : string[][];
  #falling: MovableShape2 | null = null;
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

  drop(newBlock: Tetromino2 | string): void {
    if (this.hasFalling()) {
      throw new Error('already falling')
    }
    if (typeof newBlock === 'string') {
      newBlock = new Block2(newBlock)
      this.#falling = new MovableShape2(newBlock, 0, Math.floor((this.width() - newBlock.dimension) / 2)); // dimension = 1
      console.log(newBlock)
    }
    if (newBlock instanceof Tetromino2) {
      this.#falling = new MovableShape2(newBlock, 0, Math.floor((this.width() - newBlock.dimension) / 2));
      this.#justFalling = true; // Verify this is a new block
      const shape = newBlock.currentShape()
      console.log("From Block Spot")
      console.table(shape);
      //console.log(shape[0]) // first row of the Tetromino
    }
  }

  // Return Grid with Block position with 'blockSpot'
  blockSpot(row: number, col: number): string | undefined {
    if (this.#falling && !this.#justFalling) {
      const block = this.#falling.blockSpot(row, col)
      if (block !== EMPTY) {
        return block
      }
    } if (this.#falling && this.#justFalling) { // Newly droped Tetromino will start from the top
      const block = this.#falling.blockSpot(row+1, col)
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
    this.#successOrRollBack(this.#falling!.moveLeft.bind(this.#falling), () => {
      console.log('Moving Left failed')
      return;
    })
  }

  // Tetrominoes can move right. If hit wall it move left
  moveRight() : void {
    if (!this.hasFalling()) {
      return; // Only falling block can be moved
    }
    this.#successOrRollBack(this.#falling!.moveRight.bind(this.#falling), () => {
      console.log('Moving Right failed')
      return;
    })
  }

  // Attempt method. If the move is invalid or fail. Use roll back move
  #successOrRollBack(actionFunction : any, rollbackFunction: any) : false | true {
    actionFunction();
    if (this.#invalidMove()) {
      console.log("invalid move")
      rollbackFunction();
      return false;
    }
    return true;
  }
  #invalidMove(): true | false {
    for (let row = this.#falling!.row; row < this.#falling!.row + this.#falling!.dimension; row++) {
      for (let col = 0; col < this.#falling!.col + this.#falling!.dimension; col++) {
        if (this.#hitWall(row, col) || this.#hitFloor(row, col) || this.#hitBlock(row, col)) {
          return true;
        }
      }
    }
    return false
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
    return this.#falling!.blockSpot(row, col) !== EMPTY && this.#grid[row][col] !== EMPTY;
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

  rotateTetro( direction: number ): void {
    if (!this.hasFalling()) {
      return;
    }
    const rotate : MovableShape = this.#falling!.rotateTetro(direction)
    if (this.#hitWall(rotate) || this.#stopMoving(rotate)) {
      const tryKickWall = this.#kickWall(this.#falling!, direction)
      // If they cannot rotate left or right after kicking wall. Return undefined
      if (typeof(tryKickWall) === "undefined") {
        return;
      }
      else {
        this.#falling = tryKickWall;
      }
    } else {
      // Rotate to left or right base on direction
      this.#falling = rotate
    }
  }
  moveRight(): void {
      if (!this.hasFalling()) {
          return;
      }
      const goRight: MovableShape = this.#falling!.moveRight();
      if (this.#hitWall(goRight) || this.#stopMoving(goRight)) {
          return; // set StopMoving?
      } else {
          this.#falling = goRight;
      }
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

  // Tetrominoe will kick wall to rotate if possible
  #kickWall(falling: MovableShape, direction: number): MovableShape | undefined {
    const tryToGoLeft : MovableShape = falling.moveLeft().rotateTetro(direction);
    const tryToGoRight : MovableShape = falling.moveRight().rotateTetro(direction);
    // Return new position after successfully rotated
    if (!this.#stopMoving(tryToGoLeft)) {
      return tryToGoLeft
    } else if (!this.#stopMoving(tryToGoRight)) {
      return tryToGoRight
    } else {
      return;
    }
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
  #stopMoving(shape: MovableShape): boolean {
      return shape.getBlocks().some(block => this.#notMoving[block.row][block.col] !=EMPTY);
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
