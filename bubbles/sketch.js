let bubbles = [];
let h = 0;

class Bubble {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = random(5, 30);
    this.color = color(
      random(h, h + 30),
      random(100, 255),
      random(100, 255),
      random(100, 255)
    );
  }

  float() {
    // move around using perlin noise
    let xoff = map(this.pos.x, 0, width, 0, 10);
    let yoff = map(this.pos.y, 0, height, 0, 10);
    let angle = noise(xoff, yoff) * TWO_PI * 4;
    let force = p5.Vector.fromAngle(angle);
    force.mult(0.05);
    this.acc.add(force);

    // update position
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.vel.mag() > 5) {
      this.vel.setMag(0);
    }

    // if the bubble goes off the screen, wrap it around
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    }
    if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    }
    if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }

  rotateHue() {
    this.color = color(
      (hue(this.color) + 0.1) % 255,
      saturation(this.color),
      brightness(this.color),
      alpha(this.color)
    );
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}

function setup() {
  colorMode(HSB, 255);
  createCanvas(500, 500);
  background(0, 0, 0, 0);

  h = random(225);

  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let b = new Bubble(x, y);
    bubbles.push(b);
  }
}

function draw() {
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].float();
    bubbles[i].rotateHue();
    bubbles[i].show();
  }
}
