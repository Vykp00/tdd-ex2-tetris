import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board, Board2 } from "../src/Board";
import { Tetromino, Tetromino2 } from "../src/Tetromino";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Falling ARS tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board2(10, 6);
  });

  test("start from the top middle", () => {
    board.drop(Tetromino2.T_SHAPE);

    expect(board.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("T Shape stop when they hit the bottom", () => {
    board.drop(Tetromino2.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT....
       ....T.....`
    );
  });

  test("stop when they land on another block", () => {
    board.drop(Tetromino2.O_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino2.L_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ...LLL....
       ...LOO....
       ....OO....`
    );
  });
});
