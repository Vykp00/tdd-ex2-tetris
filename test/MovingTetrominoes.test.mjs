import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

describe("A Falling Tetromino", () => {
  let board;
  beforeEach( () => {
    board = new Board(10, 6);
  });

  test("can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
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
  test("can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `..........
      .....T....
      ....TTT...
      ..........
      ..........
      ..........`
    )
  })
});
