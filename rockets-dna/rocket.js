class Rocket {
  constructor(lifespan, dna, h, h2) {
    this.pos = createVector(width / 2, height);
    this.vel = createVector();
    this.acc = p5.Vector.random2D();
    this.max_vel = 4;

    this.r = 8;
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
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (this.completed) d = 1;
    this.fitness = map(d, 0, width, width, 0);
    // this.fitness = 1 / d;

    if (this.completed) this.fitness *= 10;
    if (this.crashed) this.fitness /= 10;
  }

  update(count, target) {
    if (this.crashed || this.completed) return;

    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d < 10) {
      this.pos = target.copy();
      this.completed = true;
    }

    if (
      this.pos.x > width ||
      this.pos.x < 0 ||
      this.pos.y > height ||
      this.pos.y < 0
    ) {
      this.crashed = true;
    }

    this.applyForce(this.dna.genes[count]);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.limit(this.max_vel);

    this.path.push(this.pos.copy());
  }

  show(target) {
    // draw the tail
    for (let i = 0; i < this.path.length - 1; i++) {
      push();
      let p = this.path[i];
      let p2 = this.path[i + 1];
      let d = dist(p2.x, p2.y, target.x, target.y);
      let alpha = map(d, 0, width, 100, 0);
      let c = color(
        hue(this.color_tail),
        saturation(this.color_tail),
        brightness(this.color_tail),
        alpha
      );
      stroke(c);
      strokeWeight(10);
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
    // ellipse(0, 0, this.r * 2);
    triangle(0, -this.r, 0, this.r, this.r * 2, 0);
    pop();
  }
}
