import {beforeEach, describe, test} from "vitest";
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.ts";
import {Board} from "../src/Board";

describe("A falling Tetromino can be rotated", () => {
    let board;
    beforeEach(() => {
        // Place the first Tetromino
        board = new Board(10, 6);
    });
    test("rotated to the left", () => {
        const shape = Tetromino.T_SHAPE
        board.drop(shape);
        board.tick()
        board.rotateLeft()

        expect(board.toString()).to.equalShape(
            `..........
       ....T.....
       ...TT.....
       ....T.....
       ..........
       ..........`
        );
    })
})
