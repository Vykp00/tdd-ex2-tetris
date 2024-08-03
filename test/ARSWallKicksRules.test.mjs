import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino} from "../src/Tetromino.ts";
import { Board2 } from "../src/Board";
import { moveBeyondBoard } from "./MovingTetrominoes.test.mjs";

describe("In ARS wall kicks,", () => {
  let board;
  beforeEach(() => {
    board = new Board2(10, 6);
    board.drop(Tetromino.I_SHAPE);
    board.rotateTetro(1)
    moveBeyondBoard(board, "left");
    moveBeyondBoard(board, "down");

  });
  test("The I shape will never kick", () => {
    board.drop(Tetromino.I_SHAPE)
    board.rotateTetro(3);
    board.tick()
    board.tick()
    moveBeyondBoard(board, "left");
    board.rotateTetro(3);

    expect(board.toString()).to.equalShape(
      `..........
       .I........
       II........
       II........
       II........
       I.........`);
  });
});
