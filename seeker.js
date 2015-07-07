var hypot = 300;// this is the furthest possible pythag two things can be
var seekerscore = 2500;

function spawnSeeker() {
    var seeker = PIXI.Sprite.fromImage('beamer.png');
    seekers.addChild(seeker);
    seeker.health = 2;
    seeker.hit = false;
    seeker.anchor.x = 0;
    seeker.anchor.y = 0;
    seeker.tint = 0xFFFF00;
    seeker.alpha = 1;
    seeker.seed = Math.random() * PIXI.PI_2;
    seeker.x = Math.floor(Math.cos(seeker.seed) * 240) + player.x;
    seeker.y = Math.floor(Math.sin(seeker.seed) * 210) + player.y;
    hexCorrect(seeker);
    seeker.dx = .02;
    seeker.dy = .02;
    seeker.goalx = 0;
    seeker.goaly = 0;
    seeker.vx = 0;
    seeker.vy = 0;
    seeker.max = 0;
    seeker.collideHandler = function(){
        seeker.health--;
        seeker.hit = true;
    };
}

function spawnSeekerAt(x,y) {
    var seeker = PIXI.Sprite.fromImage('beamer.png');
    seekers.addChild(seeker);
    seeker.health = 2;
    seeker.hit = false;
    seeker.anchor.x = 0;
    seeker.anchor.y = 0;
    seeker.tint = 0xFFFF00;
    seeker.alpha = .9;
    seeker.x = x;
    seeker.y = y;
    hexCorrect(seeker);
    seeker.dx = .02;
    seeker.dy = .02;
    seeker.goalx = 0;
    seeker.goaly = 0;
    seeker.vx = 0;
    seeker.vy = 0;
    seeker.max = 0;
    seeker.collideHandler = function(){
        seeker.health--;
        seeker.hit = true;
    };
}
function fastPythag(x, y){
    return (x * x) + (y * y);
}
function upSeeker(thisseeker){
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
    if (thisseeker.health <= 0){
        score += seekerscore;
        seekers.removeChild(thisseeker);
        thisseeker.destroy();
        return 0;
    }

    thisseeker.goalx = player.x - thisseeker.x;
    thisseeker.goaly = player.y - thisseeker.y;


    findmin(thisseeker.goalx, thisseeker.goaly);
    findmin(thisseeker.goalx - MWIDTH, thisseeker.goaly);
    findmin(thisseeker.goalx + MWIDTH, thisseeker.goaly);
    findmin(thisseeker.goalx - .5 * MWIDTH, thisseeker.goaly - MHEIGHT);
    findmin(thisseeker.goalx + .5 * MWIDTH, thisseeker.goaly - MHEIGHT);
    findmin(thisseeker.goalx - .5 * MWIDTH, thisseeker.goaly + MHEIGHT);
    findmin(thisseeker.goalx + .5 * MWIDTH, thisseeker.goaly + MHEIGHT);
    thisseeker.goalx = minx;
    thisseeker.goaly = miny;

    if (thisseeker.goalx > 0){
        thisseeker.vx += thisseeker.dx;
        if(thisseeker.vx < 0)
            thisseeker.vx += thisseeker.dx;
    } else {
        thisseeker.vx -= thisseeker.dx;
        if(thisseeker.vx > 0)
            thisseeker.vx -= thisseeker.dx;
    }

    if (thisseeker.goaly > 0){
        thisseeker.vy += thisseeker.dy;
        if(thisseeker.vy < 0)
            thisseeker.vy += thisseeker.dx;
    } else {
        thisseeker.vy -= thisseeker.dy;
        if (thisseeker.vy > 0)
            thisseeker.vy -= thisseeker.dx;
    }


    if(thisseeker.vx < -3){
        thisseeker.vx += .2;
    }
    if(thisseeker.vx > 3){
        thisseeker.vx -= .2;
    }
    if(thisseeker.vy < -3){
        thisseeker.vy += .2;
    }
    if(thisseeker.vy > 3){
        thisseeker.vy -= .2;
    }

    thisseeker.x += thisseeker.vx;
    thisseeker.y += thisseeker.vy;

    hexCorrect(thisseeker);
    collideRect(thisseeker, player, thisseeker.collideHandler, player.collideHandler);
    for (var i = bullets.children.length - 1; i >= 0; i--) {
        collideRect(bullets.getChildAt(i), thisseeker, function(){bullCollideHandler(i)}, thisseeker.collideHandler);
    }
}