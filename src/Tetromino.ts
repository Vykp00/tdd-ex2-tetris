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

    constructor(
        initDirection: number,
        directions: number | RotatingShape[],
        initialShape?: string
    ) {
        directions = directions as number;
        this.#initDirection = initDirection;
        const shape = new RotatingShape(initialShape);
        this.#directions = [
            shape,
            shape.rotateRight(),
        ].slice(0, directions as number);
    }
    #shape() {
        return this.#directions[this.#initDirection];
    }
    toString() {
        return this.#shape().toString();
    }
}
