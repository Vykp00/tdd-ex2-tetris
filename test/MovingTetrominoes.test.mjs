import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

describe("A Falling Tetromino", () => {
  let board;
  beforeEach( () => {
    board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE);
  });

  test("can be moved left", () => {
    board.tick()
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `..........
      ...T......
      ..TTT.....
      ..........
      ..........
      ..........`
    )
  });
});
