import {RotatingShape} from "./RotatingShape";
import {Shape} from "./shapeutils";
export class Tetromino implements Shape {
    static T_SHAPE = new Tetromino(
        0,
        4,
        '.T.\nTTT\n...\n');

    static I_SHAPE = new Tetromino(
        0,
        2,
        '.....\n.....\nIIII.\n.....\n.....\n');

    static O_SHAPE = new Tetromino(
        0,
        1,
        '.OO\n.OO\n...\n');

    #initDirection: number;
    #directions: RotatingShape[];

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

    private currentShape(): RotatingShape {
        return this.#directions[this.#initDirection];
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
    width(): number{
        return this.currentShape().width();
    }
    height(): number {
        return this.currentShape().height();
    }
    blockSpot(row: number, col: number): string | undefined {
        return this.currentShape().blockSpot(row, col)
    }

    toString() {
        return this.currentShape().toString();
    }
}
