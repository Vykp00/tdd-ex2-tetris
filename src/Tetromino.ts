import {RotatingShape} from "./RotatingShape";
import {Shape} from "./shapeutils";
export class Tetromino implements Shape {
    static T_SHAPE = new Tetromino(
        0,
        4,
        '.T.\nTTT\n...\n'
    );
    #initDirection: number;
    #directions: RotatingShape[];

    static I_SHAPE = new Tetromino(
        0,
        1,
        '.....\n.....\nIIII.\n.....\n.....\n')
    constructor(
        initDirection: number,
        directions: number | RotatingShape[],
        initialShape?: string,
    ) {
        if (typeof initialShape === 'string') {
            directions = directions as number;
            this.#initDirection = initDirection;
            const shape = new RotatingShape(initialShape);
            this.#directions = [
                shape,
                shape.rotateRight(),
                shape.rotateRight().rotateRight(),
                shape.rotateRight().rotateRight().rotateRight(),
            ].slice(0, directions as number);
        } else {
            directions = directions as RotatingShape[];
            this.#initDirection = (initDirection + directions.length) % directions.length;
            this.#directions = directions
        }
    }
    #shape() {
        return this.#directions[this.#initDirection];
    }
    rotateRight() {
        return new Tetromino(this.#initDirection + 1, this.#directions);
    }
    rotateLeft() {
        return new Tetromino(this.#initDirection -1, this.#directions);
    }
    toString() {
        return this.#shape().toString();
    }
}
