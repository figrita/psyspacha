function spawnWingman() {
    var wingman = PIXI.Sprite.fromImage('beamer.png');
    wingmans.addChild(wingman);
    wingman.health = 2;
    wingman.anchor.x = 0;
    wingman.anchor.y = 0;
    wingman.tint = player.tint;
    wingman.alpha = 1;
    wingman.seed = Math.random() * PIXI.PI_2;
    wingman.x = Math.floor(Math.cos(wingman.seed) * 240) + player.x;
    wingman.y = Math.floor(Math.sin(wingman.seed) * 210) + player.y;
    hexCorrect(wingman);
    wingman.dx = .1;
    wingman.dy = .1;
    wingman.goalx = 0;
    wingman.goaly = 0;
    wingman.vx = 0;
    wingman.vy = 0;
}

function upWingman(thiswingman){
    thiswingman.tint = player.tint;
    var min = null;
    var minx = null;
    var miny = null;
    function findmin(x,y){
        var d = fastPythag(x,y);
        if(d < min || min == null){
            min = d;
            minx = x;
            miny = y;
        }

    }

    thiswingman.goalx = player.x - thiswingman.x;
    thiswingman.goaly = player.y - thiswingman.y;


    findmin(thiswingman.goalx, thiswingman.goaly);
    findmin(thiswingman.goalx - MWIDTH, thiswingman.goaly);
    findmin(thiswingman.goalx + MWIDTH, thiswingman.goaly);
    findmin(thiswingman.goalx - .5 * MWIDTH, thiswingman.goaly - MHEIGHT);
    findmin(thiswingman.goalx + .5 * MWIDTH, thiswingman.goaly - MHEIGHT);
    findmin(thiswingman.goalx - .5 * MWIDTH, thiswingman.goaly + MHEIGHT);
    findmin(thiswingman.goalx + .5 * MWIDTH, thiswingman.goaly + MHEIGHT);
    thiswingman.goalx = minx;
    thiswingman.goaly = miny;

    if (thiswingman.goalx > 0){
        thiswingman.vx += thiswingman.dx;
        if(thiswingman.vx < 0)
            thiswingman.vx += thiswingman.dx;
    } else {
        thiswingman.vx -= thiswingman.dx;
        if(thiswingman.vx > 0)
            thiswingman.vx -= thiswingman.dx;
    }

    if (thiswingman.goaly > 0){
        thiswingman.vy += thiswingman.dy;
        if(thiswingman.vy < 0)
            thiswingman.vy += thiswingman.dx;
    } else {
        thiswingman.vy -= thiswingman.dy;
        if (thiswingman.vy > 0)
            thiswingman.vy -= thiswingman.dx;
    }


    if(thiswingman.vx < -5){
        thiswingman.vx += .2;
    }
    if(thiswingman.vx > 5){
        thiswingman.vx -= .2;
    }
    if(thiswingman.vy < -5){
        thiswingman.vy += .2;
    }
    if(thiswingman.vy > 5){
        thiswingman.vy -= .2;
    }

    thiswingman.x += thiswingman.vx;
    thiswingman.y += thiswingman.vy;

    hexCorrect(thiswingman);

}