import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

// Level 5: Moving falling Tetrominoes
function moveBeyondLeft(board) {
  for (let i = 0; i < 10; i++) {
    board.moveLeft();
  }
}
describe("A Falling Tetromino", () => {
  let board;
  beforeEach( () => {
    board = new Board(10, 6);
  });

  test("can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `..........
      ...T......
      ..TTT.....
      ..........
      ..........
      ..........`
    );
  });
  test("can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `..........
      .....T....
      ....TTT...
      ..........
      ..........
      ..........`
    );
  });
  test("can be moved down", () => {
    board.drop(Tetromino.O_SHAPE);
    board.tick();
    board.tick();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....OO....
       ....OO....
       ..........
       ..........`
    );
  });
});

describe("Tetromino cannot be moved beyond the board", () => {
  let board;
  beforeEach( () => {
    board = new Board(6, 4);
  });
  test("cannot be moved Left anymore", () => {
    board.drop(Tetromino.O_SHAPE);
    board.tick();
    moveBeyondLeft(board);

    expect(board.toString()).to.equalShape(
     `......
     OO....
     OO....
     ......`
    );
  });
});
