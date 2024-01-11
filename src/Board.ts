import { Shape, shapeToString } from "./shapeutils";
export class Board implements Shape {
  #width: number;
  #height: number;
  #currentBlock: string | null;
  constructor(width: number, height: number, currentBlock: string | null) {
    this.#width = width;
    this.#height = height;
    this.#currentBlock = currentBlock;
  }
  width() {
    return this.#width;
  }
  height() {
    return this.#height;
  }
  // Print board
  toString() {
    if (typeof this.#currentBlock === "string") {
      let outBlock: string = `.${this.#currentBlock}.\n`;
      this.#height = this.#height - 1;
      outBlock += shapeToString(this);
      return outBlock;
    } else {
      return shapeToString(this);
    }
  }
  drop(block: string) {
    return (this.#currentBlock = block);
  }
}
