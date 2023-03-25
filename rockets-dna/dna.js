class DNA {
  constructor(lifespan) {
    this.genes = [];
    this.lifespan = lifespan;
    this.max_acc = 0.2;

    for (let i = 0; i < lifespan; i++) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(this.max_acc);
    }
  }

  crossover(partner) {
    let child = new DNA(this.lifespan);
    let midpoint = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else child.genes[i] = partner.genes[i];
    }
    return child;
  }

  mutation() {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < 0.01) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(this.max_acc);
      }
    }
  }
}
