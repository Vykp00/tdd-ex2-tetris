import {Shape, shapeToString} from "./shapeutils";

const EMPTY = ".";

function shapeArray(size: number): string[][] {
    return Array.from({ length: size }, () => Array(size).fill(EMPTY));
}
function convertRotateRight(shape: string[][]) {
    const size = shape.length;
    const rotated = shapeArray(size);
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            rotated[row][col] = shape[size - 1 - col][row];
        }
    }
    return new RotatingShape(rotated);
}
export class RotatingShape implements Shape {
    #shape2: string[][];
    constructor(shape2: string | string[][]) {
      if (typeof shape2 === 'string') {
        this.#shape2 = shape2
          .replaceAll(' ', '') // Remove space between letter
          .trim() // removes whitespace from both ends of string
          .split('\n') // split each row
          .map((row) => row.split(''));
      } else {
        this.#shape2 =shape2
      }
    }
    width(): number {
        return this.#shape2[0].length;
    }
    height(): number {
        return this.#shape2.length;
    }
    blockSpot(row: number, col: number): string | undefined {
        return this.#shape2[row][col];
    }

    rotateRight() {
        return convertRotateRight(this.#shape2);
    }
    rotateLeft() {
        return this.rotateRight().rotateRight().rotateRight();
    }
    toString(){
        return shapeToString(this);
    }
}
