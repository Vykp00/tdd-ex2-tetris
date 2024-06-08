import { afterEach, beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.ts";
import {Board} from "../src/Board";
import { moveBeyondBoard } from "./MovingTetrominoes.test.mjs";

describe("A falling Tetromino can be rotated", () => {
    let board;
    beforeEach(() => {
        // Place the first Tetromino
        board = new Board(10, 6);
        const shape = Tetromino.T_SHAPE
        board.drop(shape);
        board.tick()
    });
    afterEach(() => {
      board = null
    })
    test("rotated to the left", () => {
        board.rotateTetro(1)
        expect(board.toString()).to.equalShape(
            `..........
       ....T.....
       ...TT.....
       ....T.....
       ..........
       ..........`
        );
    });
    test("rotated to the right", () => {
      board.rotateTetro(3)
      expect(board.toString()).to.equalShape(
        `..........
         ....T.....
         ....TT....
         ....T.....
         ..........
         ..........`
      );
    });
})

describe("A falling tetromino cannot be rotated", () => {
  let board;
  beforeEach(() => {
    // Place the current board
    board = new Board(5, 7)
    board.drop(Tetromino.I_SHAPE)
    moveBeyondBoard(board, 'right')
    moveBeyondBoard(board, 'down')
    board.drop(Tetromino.I_SHAPE)
    moveBeyondBoard(board, 'left')
    moveBeyondBoard(board, 'down')
  });
  test(", When there's no room to rotated", () => {
    board.drop(Tetromino.I_SHAPE)
    board.tick()
    board.tick()
    moveBeyondBoard(board, 'right')
    board.rotateTetro(3)

    expect(board.toString()).to.equalShape(
      `.....
      .....
      ...I.
      I..II
      I..II
      I..II
      I...I`)
  });
})
