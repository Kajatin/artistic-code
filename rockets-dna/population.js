class Population {
  constructor(size, lifespan) {
    this.rockets = [];
    this.popsize = size;
    this.matingpool = [];
    this.lifespan = lifespan;
    this.obstacles = [];

    this.h = random(225);
    this.h2 = random(225);

    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i] = new Rocket(lifespan, null, this.h, this.h2);
    }
  }

  run(count, target) {
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].update(count, target, this.obstacles);
      this.rockets[i].show(target);
    }

    for (let i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i].show();
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

    this.matingpool = [];
    for (let i = 0; i < this.popsize; i++) {
      // let n = this.rockets[i].fitness * 100;
      let n = (this.rockets[i].fitness / maxfit) * 100;
      // console.log(this.rockets[i].fitness, maxfit, n);
      for (let j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
  }

  selection() {
    let newRockets = [];
    for (let i = 0; i < this.rockets.length; i++) {
      let parentA = random(this.matingpool);
      // if (parentA.completed) {
      //   newRockets[i] = new Rocket(this.lifespan, parentA.dna, this.h, this.h2);
      //   continue;
      // } else
      if (parentA.crashed) {
        newRockets[i] = new Rocket(this.lifespan, null, this.h, this.h2);
        continue;
      }

      let parentB = random(this.matingpool);
      // if (parentB.completed) {
      //   newRockets[i] = new Rocket(this.lifespan, parentB.dna, this.h, this.h2);
      //   continue;
      // } else
      if (parentB.crashed) {
        newRockets[i] = new Rocket(this.lifespan, null, this.h, this.h2);
        continue;
      }

      let child = parentA.dna.crossover(
        parentB.dna,
        parentA.fitness,
        parentB.fitness
      );
      child.mutation();
      newRockets[i] = new Rocket(this.lifespan, child, this.h, this.h2);
    }
    this.rockets = newRockets;
  }

  createObstacle(new_obstacle) {
    let obstacle = new Obstacle(new_obstacle);
    this.obstacles.push(obstacle);
  }
}
