class Rocket {
  constructor(lifespan, dna, h, h2) {
    this.pos = createVector(width / 2, height - 10);
    this.vel = createVector();
    this.acc = createVector();
    this.max_vel = 4;

    this.r = 10;
    this.tailWidth = 15;
    this.tailLength = 30;

    this.color_head = color(
      random(h, h + 30),
      random(100, 255),
      random(100, 255)
    );
    this.color_tail = color(
      random(h2, h2 + 30),
      random(100, 255),
      random(100, 255)
    );
    this.path = [];

    this.crashed = false;
    this.completed = false;

    this.fitness = 0;
    if (dna) this.dna = dna;
    else this.dna = new DNA(lifespan);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  calcFitness(target) {
    let max_dist = 0;
    max_dist = max(max_dist, dist(0, 0, target.x, target.y));
    max_dist = max(max_dist, dist(width, 0, target.x, target.y));
    max_dist = max(max_dist, dist(0, height, target.x, target.y));
    max_dist = max(max_dist, dist(width, height, target.x, target.y));

    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = map(d, 0, max_dist, 1, 0);

    if (this.completed) this.fitness *= 10;
    if (this.crashed) this.fitness /= 10;
  }

  update(count, target, obstacles) {
    if (this.crashed || this.completed) return;

    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d < 10) {
      this.pos = target.copy();
      this.completed = true;
    }

    // Rocket has hit left or right of window
    if (this.pos.x > width || this.pos.x < 0) {
      this.crashed = true;
    }

    // Rocket has hit top or bottom of window
    if (this.pos.y > height || this.pos.y < 0) {
      this.crashed = true;
    }

    for (let i = 0; i < obstacles.length; i++) {
      if (obstacles[i].checkCollision(this)) {
        this.crashed = true;
        break;
      }
    }

    this.applyForce(this.dna.genes[count]);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.limit(this.max_vel);

    this.path.push(this.pos.copy());
    if (this.path.length > this.tailLength) this.path.splice(0, 1);
  }

  show(target) {
    // max dist is the max distance between the target and any of the 4 corners
    let max_dist = 0;
    max_dist = max(max_dist, dist(0, 0, target.x, target.y));
    max_dist = max(max_dist, dist(width, 0, target.x, target.y));
    max_dist = max(max_dist, dist(0, height, target.x, target.y));
    max_dist = max(max_dist, dist(width, height, target.x, target.y));

    // draw the tail
    for (let i = 0; i < this.path.length - 1; i++) {
      push();
      let p = this.path[i];
      let p2 = this.path[i + 1];
      let d = dist(p2.x, p2.y, target.x, target.y);
      let alpha = map(d, 0, max_dist, 100, 0);
      let c = color(
        hue(this.color_tail),
        saturation(this.color_tail),
        brightness(this.color_tail),
        alpha
      );
      stroke(c);
      strokeWeight(this.tailWidth);
      line(p.x, p.y, p2.x, p2.y);
      pop();
    }

    // draw the head
    push();
    noStroke();
    fill(this.color_head);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    // rect(0, 0, this.r * 2, this.r);
    ellipse(0, 0, this.r * 2);
    // triangle(-this.r, -this.r, -this.r, this.r, this.r, 0);
    pop();
  }
}
