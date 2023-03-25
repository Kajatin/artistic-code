class Obstacle {
  constructor(path) {
    this.path = path;
    this.weight = 5;
  }

  distSq(v, w) {
    return (v.x - w.x) * (v.x - w.x) + (v.y - w.y) * (v.y - w.y);
  }

  distToSegment(p, v, w) {
    let l2 = this.distSq(v, w);
    if (l2 == 0) return this.distSq(p, v);
    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = max(0, min(1, t));
    return this.distSq(
      p,
      createVector(v.x + t * (w.x - v.x), v.y + t * (w.y - v.y))
    );
  }

  checkCollision(rocket) {
    for (let i = 0; i < this.path.length - 1; i++) {
      let p = this.path[i];
      let p2 = this.path[i + 1];
      let d = this.distToSegment(rocket.pos, p, p2);
      if (d < rocket.r) {
        return true;
      }
    }

    return false;
  }

  show() {
    push();
    noFill();
    stroke(255);
    strokeWeight(this.weight);
    for (let i = 0; i < this.path.length - 1; i++) {
      let p = this.path[i];
      let p2 = this.path[i + 1];
      line(p.x, p.y, p2.x, p2.y);
    }
    pop();
  }
}
