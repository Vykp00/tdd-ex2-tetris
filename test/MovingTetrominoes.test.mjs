import {beforeEach, describe, test} from "vitest";
import {expect} from "chai";
import { Board2} from "../src/Board";
import { Tetromino } from "../src/Tetromino";

// Level 5: Moving falling Tetrominoes
export function moveBeyondBoard(board, direction) {
    const overBoardRow = board.width() + 3 // Board's width + 3
    const overBoardCol = board.height() + 3// Board's height + 3
    if (direction === "down") {
        for (let i = 0; i < overBoardCol; i++) {
            board.tick();
        }
    } else if (direction === "left") {
        for (let i = 0; i < overBoardRow; i++) {
            board.moveLeft();
        }
    } else if (direction === "right") {
        for (let i = 0; i < overBoardRow; i++) {
            board.moveRight();
        }
    }
}

describe("A Falling Tetromino", () => {
    let board;
    beforeEach(() => {
        board = new Board2(10, 6);
    });

    test("can be moved left", () => {
        board.drop(Tetromino.T_SHAPE);
        board.tick();
        board.moveLeft();

        expect(board.toString()).to.equalShape(
          `..........
           ..TTT.....
           ...T......
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
      ....TTT...
      .....T....
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
    beforeEach(() => {
        board = new Board2(10, 6);
        board.drop(Tetromino.O_SHAPE);
        board.tick();
    });
    test("cannot be moved Left anymore", () => {
        moveBeyondBoard(board, "left");

        expect(board.toString()).to.equalShape(
            `..........
             OO........
             OO........
             ..........
             ..........
             ..........`
        );
    });
    test("cannot be moved Right anymore", () => {
        moveBeyondBoard(board, "right");

        expect(board.toString()).to.equalShape(
            `..........
             ........OO
             ........OO
             ..........
             ..........
             ..........`
        );
    });
    test("cannot be move Down anymore", () => {
        moveBeyondBoard(board, "down")
        expect(board.toString()).to.equalShape(
          `..........
           ..........
           ..........
           ..........
           ....OO....
           ....OO....`
        );
    })
});

describe("When falling a Tetromino touch other blocks", () => {
    let board;
    beforeEach(() => {
        // Place the first Tetromino
        board = new Board2(12, 4);
        board.drop(Tetromino.O_SHAPE);
        moveBeyondBoard(board, "right");
        moveBeyondBoard(board, "down");
        board.drop(Tetromino.O_SHAPE);
        moveBeyondBoard(board, "left");
        moveBeyondBoard(board, "down");
    });
    test("it can't be moved left", () => {
        board.drop(Tetromino.T_SHAPE);
        board.tick()
        moveBeyondBoard(board, "left");
        console.log(board.toString())
        board.moveLeft()
        console.log(board.toString())
        expect(board.toString()).to.equalShape(
            `............
             .TTT........
             OOT.......OO
             OO........OO`
        );
    });
    test("it can't be moved right", () => {
        board.drop(Tetromino.L_SHAPE);
        board.tick()
        moveBeyondBoard(board, "right");
        expect(board.toString()).to.equalShape(
            `............
            .........LLL
            OO.......LOO
            OO........OO`
        );
    });
    test("it can't be moved down", () => {
        board.drop(Tetromino.I_SHAPE);
        moveBeyondBoard(board, "right");
        moveBeyondBoard(board, "down");
        expect(board.toString()).to.equalShape(
            `............
            ........IIII
            OO........OO
            OO........OO`
        );
    })
});
