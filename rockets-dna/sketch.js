let target;
let targetRadius = 16;
let pulseDir = 1;
let population;
let count;
let new_obstacle = [];

function setup() {
  colorMode(HSB, 255);
  createCanvas(500, 300);
  background(0);

  target = createVector(random(50, width - 50), random(20, 100));
  population = new Population(50, 200);
  count = 0;
}

function draw() {
  background(0);

  population.run(count, target);
  count++;

  if (count == population.lifespan) {
    population.evaluate(target);
    population.selection();
    count = 0;
  }

  if (true == mouseIsPressed) {
    new_obstacle.push(createVector(mouseX, mouseY));
  } else if (false == mouseIsPressed && new_obstacle.length > 0) {
    new_obstacle.push(createVector(mouseX, mouseY));
    population.createObstacle(new_obstacle);
    new_obstacle = [];
  }

  if (new_obstacle.length > 1) {
    for (let i = 0; i < new_obstacle.length - 1; i++) {
      let p = new_obstacle[i];
      let p2 = new_obstacle[i + 1];
      stroke(255);
      line(p.x, p.y, p2.x, p2.y);
    }
  }

  // fill(255);
  ellipse(target.x, target.y, targetRadius);
  targetRadius += 0.1 * pulseDir;
  if (targetRadius > 22) {
    pulseDir = -1;
  }
  if (targetRadius < 16) {
    pulseDir = 1;
  }
}
