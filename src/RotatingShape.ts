import {Shape, shapeToString} from "./shapeutils";

const EMPTY = ".";

function shapeArray(size: number): string[][] {
    return Array.from({ length: size }, () => Array(size).fill(EMPTY));
}
function rotateRight(shape: string[][]) {
    const size = shape.length;
    const rotated = shapeArray(size);
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            rotated[row][col] = shape[size - 1 - col][row];
        }
    }
    return rotated;
}
export class RotatingShape implements Shape {
    private readonly shape: string[][];

    constructor(shape: string | string[][]) {
      if (typeof shape === 'string') {
        this.shape = shape
          .replaceAll(' ', '') // Remove space between letter
          .trim() // removes whitespace from both ends of string
          .split('\n') // split each row
          .map((row) => row.split(''));
      } else {
        this.shape = shape;
      }
    }
    width(): number {
        return this.shape[0].length;
    }
    height(): number {
        return this.shape.length;
    }
    blockSpot(row: number, col: number): string | undefined {
        return this.shape[row][col];
    }

    rotateRight(): RotatingShape {
        return new RotatingShape(rotateRight(this.shape));
    }
    rotateLeft(): RotatingShape {
        return this.rotateRight().rotateRight().rotateRight();
    }
    toString(): string {
        return shapeToString(this);
    }
}
