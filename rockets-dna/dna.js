class DNA {
  constructor(lifespan, genes) {
    this.genes = [];
    this.lifespan = lifespan;
    this.max_acc = 0.2;
    this.mutation_rate = 0.01;

    if (genes) this.genes = genes;
    else this.generate();
  }

  generate() {
    for (let i = 0; i < this.lifespan; i++) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(random(0, this.max_acc));
      // this.genes[i].setMag(this.max_acc);
    }
  }

  crossover(partner, fitnessA, fitnessB) {
    let child = [];
    let midpoint = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.push(this.genes[i]);
      else child.push(partner.genes[i]);
    }
    return new DNA(this.lifespan, child);

    // let ratioB = 0;
    // if (fitnessB == 1) ratioB = 1;
    // else if (fitnessB != 0 && fitnessA != 1)
    //   ratioB = 1 / (1 + (fitnessA + 1) / (fitnessB + 1));

    // let child = [];
    // for (let i = 0; i < this.genes.length; i++) {
    //   if (random(1) < ratioB) child.push(partner.genes[i]);
    //   else child.push(this.genes[i]);
    // }
    // return new DNA(this.lifespan, child);
  }

  mutation() {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < this.mutation_rate) {
        this.genes[i] = p5.Vector.random2D();
        // this.genes[i].setMag(random(0, this.max_acc));
        this.genes[i].setMag(this.max_acc);
      }
    }
  }
}
