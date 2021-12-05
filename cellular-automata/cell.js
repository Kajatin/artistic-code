class Cell {
    constructor() {
        this.state = false;
        this.width = 1;
        this.height = 1;
    }

    draw(x, y, scale) {
        push();
        translate(x * this.width * scale, y * this.height * scale);
        if (this.state) {
            fill(51);
        } else {
            fill(235);
        }
        noStroke();
        rect(0, 0, this.width * scale, this.height * scale);
        pop();
    }
}