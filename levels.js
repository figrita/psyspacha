function levelMachine(level){
    if (beamerwait) {
        beamerwait--;
    }
    else if (getRandomInt(0, 100) > level.beamerChance) {
        spawnBeamer();
        beamerwait += level.snakeWait;
    }
    else {
        beamerwait += level.beamerWait;
    }
    if (snakewait) {
        snakewait--;
    }
    else if (getRandomInt(0, 100) > level.snakeChance) {
        spawnSnake();
        snakewait += level.snakeWait;
    }
    else {
        snakewait += level.snakeWait;
    }
    if (getRandomInt(0, 1000) === 2){
        spawnSeeker();
    }
    if (getRandomInt(0, 1000) === 2){
        spawnSpitter();
    }
}

function level(beamerChance, beamerWait, snakeChance, snakeWait){
    this.beamerChance = beamerChance;
    this.beamerWait = beamerWait;
    this.snakeChance = snakeChance;
    this.snakeWait = snakeWait;
}

var level1 = new level(75, 60, 80, 60);