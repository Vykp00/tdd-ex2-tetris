import { Shape, shapeToString } from "./shapeutils";
export class Board implements Shape {
  // '#' set hard private
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
  blockSpot(row: number, col: number): string | undefined {
      return ;
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
  // Drop block
  drop(block: string) {
    return (this.#currentBlock = block);
  }
}
