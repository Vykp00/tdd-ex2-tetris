import {Shape, shapeToString} from "./shapeutils";

function shapeArray(size: number): any[][] {
    // Return srring shape to array
    const array = new Array(size);
    for (let row = 0; row < size; row++) {
        array[row] = new Array(size);
    }
    return array;
}
function convertRotateRight(shape: string[][]) {
    const size = shape.length;
    const rotated = shapeArray(size);
    for (let row = 0; row < size; row++) {
        for (let column = 0; column < size; column++) {
            rotated[row][column] = shape[size - 1 - column][row];
        }
    }
    return new RotatingShape(rotated, rotated, 0);
}
export class RotatingShape implements Shape {
    #shape: string
    #shape2: string[][];
    tetro: string
    direction: number | null
    constructor(shape: string, shape2: string | string[][], direction: number | null) {
      if (typeof shape2 === 'string') {
        this.#shape2 = shape2
          .replaceAll(' ', '') // Remove space between letter
          .trim() // removes whitespace from both ends of string
          .split('\n') // split each row
          .map((row) => row.split(''));
      } else {
        this.#shape2 =shape2
      }
        this.#shape = shape
        this.tetro = this.#shape.slice(0,4)+this.#shape.slice(9,13)+ this.#shape.slice(18,22)+'\n'
        this.direction = direction
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
        const rotated = this.tetro.slice(-4,-3)+this.tetro.slice(4,5)+this.tetro.slice(0,1)+'\n'+this.tetro.slice(-3,-2)+this.tetro.slice(5,6)+this.tetro.slice(1,2)+'\n'+this.tetro.slice(-2,-1)+this.tetro.slice(6,7)+this.tetro.slice(2,3)+'\n'
        return new RotatingShape(rotated, rotated, 1)
    }
    rotateLeft() {
        const rotated2 = this.tetro.slice(2,3)+this.tetro.slice(6,7)+this.tetro.slice(-2,-1)+'\n'+this.tetro.slice(1,2)+this.tetro.slice(5,6)+this.tetro.slice(-3,-2)+'\n'+this.tetro.slice(0,1)+this.tetro.slice(4,5)+this.tetro.slice(-4,-3)+'\n'
        return new RotatingShape(rotated2, rotated2, 2)
    }
    toString(){
        if (typeof this.#shape2 === 'string[][]') {
            return shapeToString(this);
        }
        if (this.direction === 1 || this.direction === 2) {
            return this.#shape
        } else {return this.tetro}
    }
}
