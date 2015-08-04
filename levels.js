function levelMachine(){
    /*if (beamers.children.length == 0) {
        spawnBeamer();
    }
    if (snakes.children.length == 0){
        spawnSnake();
    }
    if (seekers.children.length == 0){
        spawnSeeker();
    }
    if (spitters.children.length == 0){
        spawnSpitter();
    }*/
    if (getRandomInt(0, 200) === 1 && beamers.children.length < 2) {
        spawnBeamer();
    } else if (getRandomInt(0, 150) ===1 && snakes.children.length < 4) {
        spawnSnake();
    } else if (getRandomInt(0, 300) === 1 && seekers.children.length < 4){
        spawnSeeker();
    } else if (getRandomInt(0, 200) === 1 && spitters.children.length < 2){
        spawnSpitter();
    } else if (getRandomInt(0, 800) === 1 && seekhives.children.length < 1){
        spawnSeekhive();
    }
}