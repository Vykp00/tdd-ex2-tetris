import {RotatingShape} from "./RotatingShape";
import {Shape} from "./shapeutils";

// Level 7 Refactor
export class Tetromino2 implements Shape {
  static get T_SHAPE() : Tetromino2 {
    // Change: Hard code all directions instead of using Rotating Shape and initialShape
    const directions = [
      [
        ['.', '.', '.'],
        ['T', 'T', 'T'],
        ['.', 'T', '.'],
      ],
      [
        ['.', 'T', '.'],
        ['T', 'T', '.'],
        ['.', 'T', '.'],
      ],
      [
        ['.', '.', '.'],
        ['.', 'T', '.'],
        ['T', 'T', 'T'],
      ],
      [
        ['.', 'T', '.'],
        ['.', 'T', 'T'],
        ['.', 'T', '.'],
      ],
    ];
    return new Tetromino2(0, 3, directions, 'T');
  };

  static get I_SHAPE() : Tetromino2 {
    const directions = [
      [
        ['.', '.', '.', '.'],
        ['I', 'I', 'I', 'I'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
      ],
      [
        ['.', '.', 'I', '.'],
        ['.', '.', 'I', '.'],
        ['.', '.', 'I', '.'],
        ['.', '.', 'I', '.'],
      ],
    ];
    return new Tetromino2(0, 4, directions, 'I');
  };

  static get O_SHAPE() : Tetromino2 {
    const directions = [
      [
        ['.', '.', '.', '.'],
        ['.', 'O', 'O', '.'],
        ['.', 'O', 'O', '.'],
      ],
    ];
    return new Tetromino2(0, 3, directions, 'O');
  };

  static get L_SHAPE() : Tetromino2 {
    const directions = [
      [
        ['.', '.', '.'],
        ['L', 'L', 'L'],
        ['L', '.', '.'],
      ],
      [
        ['L', 'L', '.'],
        ['.', 'L', '.'],
        ['.', 'L', '.'],
      ],
      [
        ['.', '.', '.'],
        ['.', '.', 'L'],
        ['L', 'L', 'L'],
      ],
      [
        ['.', 'L', '.'],
        ['.', 'L', '.'],
        ['.', 'L', 'L'],
      ],
    ]
    return new Tetromino2(0, 3, directions, 'L')
  };

  static get J_SHAPE() : Tetromino2 {
    const directions = [
      [
        ['.', '.', '.'],
        ['J', 'J', 'J'],
        ['.', '.', 'J'],
      ],
      [
        ['.', 'J', '.'],
        ['.', 'J', '.'],
        ['J', 'J', '.'],
      ],
      [
        ['.', '.', '.'],
        ['J', '.', '.'],
        ['J', 'J', 'J'],
      ],
      [
        ['.', 'J', 'J'],
        ['.', 'J', '.'],
        ['.', 'J', '.'],
      ],
    ];
    return new Tetromino2(0, 3, directions, 'J');
  };

  static get S_SHAPE() : Tetromino2 {
    const directions = [
      [
        ['.', '.', '.'],
        ['.', 'S', 'S'],
        ['S', 'S', '.'],
      ],
      [
        ['S', '.', '.'],
        ['S', 'S', '.'],
        ['.', 'S', '.'],
      ],
    ];
    return new Tetromino2(0, 3, directions, 'S');
  };

  static get Z_SHAPE() : Tetromino2 {
    const directions = [
      [
        ['.', '.', '.'],
        ['Z', 'Z', '.'],
        ['.', 'Z', 'Z'],
      ],
      [
        ['.', '.', 'Z'],
        ['.', 'Z', 'Z'],
        ['.', 'Z', '.'],
      ],
    ];
    return new Tetromino2(0, 3, directions, 'Z');
  }

  private readonly directions : string[][][];
  private readonly initDirection: number;
  public shapeType: string;
  public dimension: number;

  constructor(
    initDirection: number,
    dimension: number,
    directions: string[][][],
    shapeType: string
    ) {
    this.directions = directions;
    this.initDirection = (initDirection + directions.length) % directions.length;
    this.dimension = dimension;
    this.shapeType = shapeType;
  }
  currentShape(): string[][] {
    return this.directions[this.initDirection];
  }
  rotateRight() {
    return new Tetromino2(this.initDirection + 1, this.dimension, this.directions, this.shapeType);
  }
  rotateLeft() {
    return new Tetromino2(this.initDirection - 1, this.dimension, this.directions, this.shapeType);
  }
  width(): number {
    return this.currentShape()[0].length
  }
  height(): number {
    return this.currentShape().length
  }
  toString() : string {
    return this.currentShape().map((row) => `${row.join('')}\n`).join('');
  }
  blockSpot(row: number, col: number): string | undefined {
    return this.currentShape()[row][col];
  }
}
