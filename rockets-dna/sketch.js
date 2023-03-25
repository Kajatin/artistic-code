let target;
let population;
let count;

function setup() {
  colorMode(HSB, 255);
  createCanvas(500, 500);
  background(0);

  target = createVector(width / 2, 50);
  population = new Population(100, 200);
  count = 0;
}

function draw() {
  background(0);

  for (let i = 0; i < 1; i++) {
    population.run(count, target);
    count += 1;

    if (count == population.lifespan) {
      population.evaluate(target);
      population.selection();
      count = 0;
    }
  }

  // fill(255);
  ellipse(target.x, target.y, 16);

  // set target to mouse position
  // target.x = mouseX;
  // target.y = mouseY;
}
