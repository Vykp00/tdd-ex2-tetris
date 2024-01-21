export class RotatingShape {
    shape: string
    constructor(shape: string) {this.shape = shape}
    toString(){
        const tetro : string = this.shape.slice(0,4)+this.shape.slice(9,13)+ this.shape.slice(18,22)+'\n';
        return tetro
    }
}
