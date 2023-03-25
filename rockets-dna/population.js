class Population {
  constructor(size, lifespan) {
    this.rockets = [];
    this.popsize = size;
    this.matingpool = [];
    this.lifespan = lifespan;

    this.h = random(225);
    this.h2 = random(225);

    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i] = new Rocket(lifespan, null, this.h, this.h2);
    }
  }

  run(count, target) {
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].update(count, target);
      this.rockets[i].show(target);
    }
  }

  evaluate(target) {
    let maxfit = 0;
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness(target);
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }

    for (let i = 0; i < this.popsize; i++) {
      //   this.rockets[i].fitness /= maxfit;
    }

    this.matingpool = [];
    for (let i = 0; i < this.popsize; i++) {
      let n = this.rockets[i].fitness * 100;
      for (let j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
  }

  selection() {
    let newRockets = [];
    for (let i = 0; i < this.rockets.length; i++) {
      let parentA = random(this.matingpool).dna;
      let parentB = random(this.matingpool).dna;
      let child = parentA.crossover(parentB);
      child.mutation();
      newRockets[i] = new Rocket(this.lifespan, child, this.h, this.h2);
    }
    this.rockets = newRockets;
  }
}
