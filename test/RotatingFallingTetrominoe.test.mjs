import { afterAll, afterEach, beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.ts";
import {Board} from "../src/Board";

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
        board.rotateLeft()
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
      board.rotateRight()
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
