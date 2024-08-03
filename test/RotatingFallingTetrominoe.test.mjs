import { afterEach, beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.ts";
import { Board, Board2 } from "../src/Board";
import { moveBeyondBoard } from "./MovingTetrominoes.test.mjs";

describe("A falling Tetromino follow ARS kick and rotation rules", () => {
  let board;
  beforeEach(() => {
    // Place the first Tetromino
    board = new Board2(10, 6);
    const shape = Tetromino.T_SHAPE;
    board.drop(shape);
    board.tick();
  });
  afterEach(() => {
    board = null;
  });
  test("basic rotation to the left", () => {
    board.rotateTetro(1);
    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`,
    );
  });
  test("basic rotation to the right", () => {
    board.rotateTetro(3);
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`,
    );
  });
  test("wall kick 1 space to the left to rotate left", () => {
    board.rotateTetro(3);
    // Hit wall
    moveBeyondBoard(board, "right")
    board.tick();
    // Try to kick wall when rotate left
    board.rotateTetro(1);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .......TTT
       ........T.
       ..........
       ..........`,
    );
  });
  test("wall kick 1 space to the right to rotate right", () => {
    board.rotateTetro(1);
    // Hit wall
    moveBeyondBoard(board, "left");
    // Try to kick wall when rotate left
    board.rotateTetro(3);

    expect(board.toString()).to.equalShape(
      `..........
      TTT.......
      .T........
      ..........
      ..........
      ..........`,
    );
  });
});

describe("A falling tetromino cannot be rotated", () => {
  let board;
  beforeEach(() => {
    // Place the current board
    board = new Board2(5, 7);
    board.drop(Tetromino.I_SHAPE);
    board.rotateTetro(1)
    moveBeyondBoard(board, "right");
    moveBeyondBoard(board, "down");
    board.drop(Tetromino.I_SHAPE);
    board.rotateTetro(3)
    moveBeyondBoard(board, "left");
    moveBeyondBoard(board, "down");
  });
  test(", when there's no room to rotate", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateTetro(3);
    board.tick();
    board.tick();
    board.tick();
    moveBeyondBoard(board, "right");
    board.rotateTetro(3);
    console.log(board.toString());

    expect(board.toString()).to.equalShape(
      `.....
      .....
      ...I.
      I..II
      I..II
      I..II
      I...I`);
  });
});
