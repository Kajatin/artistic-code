function setup() {
    let rows = 150;
    let cols = 150;
    let scale = 5;
    createCanvas(cols * scale, rows * scale);
    world = new Map(rows, cols, scale);
    world.seed(2500);
    frameRate(10);
}

function draw() {
    background(0);
    world.draw();
    world.tick();
    // noLoop();
}