import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";
import { moveBeyondBoard } from "./MovingTetrominoes.test.mjs";

describe("When a row become full,", () => {
  let board;
  // PLace a board for test
  beforeEach(() => {
    board = new Board(8,10)
  })
  test("it is removed from the board", () => {
    board.drop(Tetromino.I_SHAPE);
    moveBeyondBoard(board, "right");
    moveBeyondBoard(board, "down")
    board.drop(Tetromino.I_SHAPE);
    moveBeyondBoard(board, "left");
    moveBeyondBoard(board, "down");

    expect(board.toString()).to.equal(
      `........
      ........
      ........
      ........
      ........
      ........
      ........
      ........
      ........
      ........`
    );
  })
})
