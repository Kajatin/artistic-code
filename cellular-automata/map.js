class Map {
    constructor(rows, columns, scale) {
        this.rows = rows;
        this.columns = columns;
        this.scale = scale;

        this.world = []
        for (let i = 0; i < this.rows; i++) {
            this.world[i] = []
            for (let j = 0; j < this.columns; j++) {
                this.world[i][j] = new Cell();
            }
        }

        console.log(this.world);
    }

    draw() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.world[i][j].draw(j, i, this.scale);
            }
        }
    }

    seed(num) {
        // for (let _ = 0; _ < num; _++) {
        //     let rand_i = int(random(this.rows));
        //     let rand_j = int(random(this.columns));
        //     this.world[rand_i][rand_j].state = true;
        // }
        this.world[1][25].state = true;
        this.world[2][23].state = true;
        this.world[2][25].state = true;
        this.world[3][13].state = true;
        this.world[3][14].state = true;
        this.world[3][21].state = true;
        this.world[3][22].state = true;
        this.world[3][35].state = true;
        this.world[3][36].state = true;
        this.world[4][12].state = true;
        this.world[4][16].state = true;
        this.world[4][21].state = true;
        this.world[4][22].state = true;
        this.world[4][35].state = true;
        this.world[4][36].state = true;
        this.world[5][1].state = true;
        this.world[5][2].state = true;
        this.world[5][11].state = true;
        this.world[5][17].state = true;
        this.world[5][21].state = true;
        this.world[5][22].state = true;
        this.world[6][1].state = true;
        this.world[6][2].state = true;
        this.world[6][11].state = true;
        this.world[6][15].state = true;
        this.world[6][17].state = true;
        this.world[6][18].state = true;
        this.world[6][23].state = true;
        this.world[6][25].state = true;
        this.world[7][11].state = true;
        this.world[7][17].state = true;
        this.world[7][25].state = true;
        this.world[8][12].state = true;
        this.world[8][16].state = true;
        this.world[9][13].state = true;
        this.world[9][14].state = true;
    }

    tick() {
        let liveCounts = [];
        for (let i = 0; i < this.rows; i++) {
            liveCounts[i] = [];
            for (let j = 0; j < this.columns; j++) {
                let liveCount = 0;
                for (let ii = -1; ii < 2; ii++) {
                    for (let jj = -1; jj < 2; jj++) {
                        let idx_i = i - ii;
                        let idx_j = j - jj;
                        if (idx_i < 0 || idx_j < 0 || idx_i >= this.rows || idx_j >= this.columns) {
                            continue;
                        }

                        if (ii == 0 && jj == 0) {
                            continue;
                        }

                        if (this.world[idx_i][idx_j].state) {
                            liveCount++;
                        }
                    }
                }

                liveCounts[i][j] = liveCount;
            }
        }

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let liveCount = liveCounts[i][j];
                // console.log(liveCount);
                if (this.world[i][j].state && (liveCount == 2 || liveCount == 3)) {
                    this.world[i][j].state = true;
                } else if (!this.world[i][j].state && liveCount == 3) {
                    this.world[i][j].state = true;
                } else {
                    this.world[i][j].state = false;
                }
            }
        }
    }
}