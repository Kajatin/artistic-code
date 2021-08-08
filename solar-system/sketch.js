let planets = [];
let asteroids = [];
const radii = [0.695700, 0.002440, 0.006052, 0.006371, 0.003390, 0.069911, 0.058232, 0.025362, 0.024622]; // million km
const dist = [0, 57, 108, 150, 228, 779, 1430, 2880, 4500]; // million km from the Sun
const vel = [0, 47.87, 35.02, 29.78, 24.07, 13.07, 9.69, 6.81, 5.43]; // km/s around the Sun
const colors = [
  [60, 100, 100],
  [37, 0, 53],
  [37, 33, 78],
  [200, 95, 90],
  [22, 92, 72],
  [39, 89, 83],
  [52, 100, 90],
  [173, 57, 71],
  [215, 84, 79]
];

function setup() {
  createCanvas(2700, 1000);
  colorMode(HSB);

  for (var i = 1; i < radii.length; i++) {
    planets.push(new Planet(
      map(dist[i],0,7480,0,width),
      map(radii[i],0,0.069911,0,120),//map(0.695700,0,7480,0,width)),
      map(vel[i],0,47.87,0,0.05),
      colors[i]
    ));
  }

  var l = map(329,0,7480,0,width);
  var h = map(479,0,7480,0,width);
  for (var i = 0; i < 100; i++) {
    asteroids.push(new Asteroid(random(l,h), random(6.28), random(0.001,0.005)));
  }

  //4488 - 7480
  l = map(4488,0,7480,0,width-20);
  h = map(7480,0,7480,0,width-20);
  for (var i = 0; i < 2000; i++) {
    asteroids.push(new Asteroid(random(l,h), random(6.28), random(0.0005,0.001)));
  }
}

function draw() {
  translate(width*0.03, height/2);
  background(0);
  noStroke()
  fill(40,255,255);
  ellipse(0,0,4);

  for (planet of planets) {
    planet.show();
  }

  for (asteroid of asteroids) {
    asteroid.show();
  }
}

class Planet {
  constructor(dist, r, vel, hsb) {
    this.dist = dist;
    this.r = r;
    this.vel = vel;
    this.angle = 0;
    this.hsb = hsb;
  }

  show() {
    noStroke();
    fill(this.hsb[0],this.hsb[1],this.hsb[2]);
    ellipse(cos(this.angle)*this.dist, sin(this.angle)*this.dist, this.r);
    this.angle = this.angle + this.vel;
  }
}

class Asteroid {
  constructor(dist, angle, vel) {
    this.dist = dist;
    this.angle = angle;
    this.colour = random(20,90);
    this.vel = vel;
  }

  show() {
    noStroke();
    fill(0,0,this.colour);
    ellipse(cos(this.angle)*this.dist, sin(this.angle)*this.dist, 2);
    this.angle = this.angle + this.vel;
  }
}
