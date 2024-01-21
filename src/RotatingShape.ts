export class RotatingShape {
    shape: string
    tetro: string
    direction: number | null
    constructor(shape: string, direction: number | null) {
        this.shape = shape
        this.tetro = this.shape.slice(0,4)+this.shape.slice(9,13)+ this.shape.slice(18,22)+'\n'
        this.direction = direction
    }
    rotateRight() {
        const rotated = this.tetro.slice(-4,-3)+this.tetro.slice(4,5)+this.tetro.slice(0,1)+'\n'+this.tetro.slice(-3,-2)+this.tetro.slice(5,6)+this.tetro.slice(1,2)+'\n'+this.tetro.slice(-2,-1)+this.tetro.slice(6,7)+this.tetro.slice(2,3)+'\n'
        return new RotatingShape(rotated, 1)
    }
    rotateLeft() {
        const rotated2 = this.tetro.slice(2,3)+this.tetro.slice(6,7)+this.tetro.slice(-2,-1)+'\n'+this.tetro.slice(1,2)+this.tetro.slice(5,6)+this.tetro.slice(-3,-2)+'\n'+this.tetro.slice(0,1)+this.tetro.slice(4,5)+this.tetro.slice(-4,-3)+'\n'
        return new RotatingShape(rotated2, 2)
    }
    toString(){
        if (this.direction === 1 || this.direction === 2) {
            return this.shape
        } else {return this.tetro}
    }
}
