import {RotatingShape} from "./RotatingShape";
import {Shape} from "./shapeutils";
export class Tetromino implements Shape {
    static T_SHAPE = new Tetromino(
        0,
        4,
        '.T.\nTTT\n...\n');

    static I_SHAPE = new Tetromino(
        0,
        2,
        '..I..\n..I..\n..I..\n..I..\n.....\n');

    static O_SHAPE = new Tetromino(
        0,
        1,
        '.OO\n.OO\n...\n');

    private readonly directions: RotatingShape[];
    private readonly initDirection: number;

    constructor(
        initDirection: number,
        directions: number | RotatingShape[],
        initialShape?: string,
    ) {
        if (typeof initialShape === 'string') {
            const shape = new RotatingShape(initialShape);
            this.directions = [
                shape,
                shape.rotateRight(),
                shape.rotateRight().rotateRight(),
                shape.rotateRight().rotateRight().rotateRight(),
            ].slice(0, directions as number);
        } else {
            this.directions = directions as RotatingShape[];
        }
        this.initDirection = (initDirection + this.directions.length) % this.directions.length;
    }

    private currentShape(): RotatingShape {
        return this.directions[this.initDirection];
    }

    rotateRight() {
        return new Tetromino(this.initDirection + 1, this.directions);
    }
    rotateLeft() {
        return new Tetromino(this.initDirection -1, this.directions);
    }
    width(): number{
        return this.currentShape().width();
    }
    height(): number {
        return this.currentShape().height();
    }
    blockSpot(row: number, col: number): string | undefined {
        return this.currentShape().blockSpot(row, col)
    }

    toString() {
        return this.currentShape().toString();
    }
}

// Level 7 Refactor
export class Tetromino2 {
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
    return new Tetromino2(0, 3, directions);
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
    return new Tetromino2(0, 4, directions);
  };

  static get O_SHAPE() : Tetromino2 {
    const directions = [
      [
        ['.', '.', '.', '.'],
        ['.', 'O', 'O', '.'],
        ['.', 'O', 'O', '.'],
      ],
    ];
    return new Tetromino2(0, 3, directions);
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
    return new Tetromino2(0, 3, directions)
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
    return new Tetromino2(0, 3, directions);
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
    return new Tetromino2(0, 3, directions);
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
    return new Tetromino2(0, 3, directions);
  }

  private readonly directions : string[][][];
  private readonly initDirection: number;
  public dimension: number;

  constructor(
    initDirection: number,
    dimension: number,
    directions: string[][][],
    ) {
    this.directions = directions;
    this.initDirection = (initDirection + directions.length) % directions.length;
    this.dimension = dimension;
  }
  currentShape(): string[][] {
    return this.directions[this.initDirection];
  }
  rotateRight() {
    return new Tetromino2(this.initDirection + 1, this.dimension, this.directions);
  }
  rotateLeft() {
    return new Tetromino2(this.initDirection - 1, this.dimension, this.directions);
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
