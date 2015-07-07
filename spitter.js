/**
 * Created by Fig on 6/28/2015.
 */
var spitterscore = 2500;

function spawnSpitter() {
    var spitter = PIXI.Sprite.fromImage('beamer.png');
    spitters.addChild(spitter);
    spitter.health = 3;
    spitter.hit = false;
    spitter.anchor.x = 0;
    spitter.anchor.y = 0;
    spitter.tint = 0xFF00FF;
    spitter.alpha = 1;
    spitter.seed = Math.random() * PIXI.PI_2;
    spitter.x = Math.floor(Math.cos(spitter.seed) * 240) + player.x;
    spitter.y = Math.floor(Math.sin(spitter.seed) * 210) + player.y;
    hexCorrect(spitter);
    spitter.counter = 1;
    spitter.vx = getRandomInt(0, 1);
    if (spitter.vx){
        spitter.vx = 2;
        if (getRandomInt(0, 1))
            spitter.vx = -spitter.vx;
        spitter.vy = 0;
    } else {
        spitter.vy = 2;
        if (getRandomInt(0,1))
            spitter.vy = -spitter.vy;
    }
    if (getRandomInt(0, 1)){
        spitter.svx = spitter.vy;
        spitter.svy = spitter.vx;
    } else {
        spitter.svx = -spitter.vy;
        spitter.svy = -spitter.vx;
    }
    spitter.shoot = function(){
        spitter.counter = 1;
        spawnSpat(spitter.x + spitter.width/2,spitter.y + spitter.height/2, spitter.vy, spitter.vx, spitter.svx, spitter.svy);
    };
    spitter.collideHandler = function(){
        spitter.health--;
        spitter.hit = true;
    };
}

function upSpitter(thisspitter) {
    if (thisspitter.health <= 0) {
        score += spitterscore;
        spitters.removeChild(thisspitter);
        thisspitter.destroy();
        return 0;
    }

    thisspitter.x += thisspitter.vx;
    thisspitter.y += thisspitter.vy;

    hexCorrect(thisspitter);

    if (thisspitter.counter == 30) {
        thisspitter.shoot();
    } else {
        thisspitter.counter++;
    }

    collideRect(thisspitter, player, null, player.collideHandler);
    for (var i = bullets.children.length - 1; i >= 0; i--) {
        collideRect(bullets.getChildAt(i), thisspitter, function(){bullCollideHandler(i)}, thisspitter.collideHandler);
    };
}

function spawnSpat(x, y, vx, vy, svx, svy) {
    var spat = PIXI.Sprite.fromImage('bullet.png');
    spats.addChild(spat);
    spat.anchor.x = 0;
    spat.anchor.y = 0;
    spat.tint = 0xFF00FF;
    spat.x = x;
    spat.y = y;
    hexCorrect(spat);
    spat.vx = svx;
    spat.vy = svy;
    spat.d = pythag(spat.vx, spat.vy);
    spat.trav = 0;
    if (spat.vx)
        spat.max = MHEIGHT;
    if (spat.vy)
        spat.max = MWIDTH;
    spat.collideHandler = function () {
        spats.removeChild(spat);
        spat.destroy();
    };
}
function upSpat(thisspat){


    thisspat.x += thisspat.vx;
    thisspat.y += thisspat.vy;
    thisspat.trav += thisspat.d;
    hexCorrect(thisspat);

    if (thisspat.trav > thisspat.max) {
        thisspat.collideHandler();
        return 1;
    }
    collideRect(thisspat, player, thisspat.collideHandler, player.collideHandler);
}