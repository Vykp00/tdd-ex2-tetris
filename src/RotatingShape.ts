export class RotatingShape {
    shape: string
    tetro: string
    constructor(shape: string) {
        this.shape = shape
        this.tetro = this.shape.slice(0,4)+this.shape.slice(9,13)+ this.shape.slice(18,22)+'\n'
    }
    toString(){
        return this.tetro
    }
}
