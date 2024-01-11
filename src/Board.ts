import { Shape, shapeToString } from "./shapeutils";
export class Board implements Shape{
  #width: number;
  #height: number;
  constructor(width: number, height: number) {
    this.#width = width;
    this.#height = height;
  }
  width() {return this.#width;}
  height() {return this.#height;}
  // Print board
  toString() {
    return shapeToString(this)
  }
}
