var hypot = 300;// this is the furthest possible pythag two things can be
var seekerscore = 2500;

function spawnSeeker() {
    var seeker = PIXI.Sprite.fromImage('beamer.png');
    seekers.addChild(seeker);
    seeker.health = 1;
    seeker.spawntime = 20;
    seeker.deathflail = 0;
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
    seeker.collideHandler = function(){
        seeker.health--;
        seeker.hit = true;
    };
}

function spawnSeekerAt(x,y) {
    var seeker = PIXI.Sprite.fromImage('beamer.png');
    seekers.addChild(seeker);
    seeker.health = 1;
    seeker.spawntime = 20;
    seeker.deathflail = 0;
    seeker.hit = false;
    seeker.anchor.x = 0;
    seeker.anchor.y = 0;
    seeker.tint = 0xFFFF11;
    seeker.blendMode = PIXI.BLEND_MODES.SCREEN;
    seeker.alpha = .9;
    seeker.x = x;
    seeker.y = y;
    seeker.scale.x = .7;
    seeker.scale.y = .7;
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
    if (thisseeker.spawntime){
        if(thisseeker.spawntime % 3 == 0){
            thisseeker.visible = false;
        } else {
            thisseeker.visible = true;
        }
        thisseeker.spawntime--;
        return;
    }
    if (thisseeker.health <= 0  && thisseeker.deathflail == 0) {
        score += seekerscore;
        thisseeker.deathflail = 30;
    }
    if (thisseeker.deathflail){
        thisseeker.visible = false;
        graphics.lineStyle(3, thisseeker.tint, 1/(31- thisseeker.deathflail));
        drawCircles(thisseeker.x + thisseeker.width *.5, thisseeker.y +.5 * thisseeker.height, (30 - thisseeker.deathflail));
        if (thisseeker.deathflail === 1) {
            seekers.removeChild(thisseeker);
            thisseeker.destroy();
        }
        thisseeker.deathflail -= 1;
        return;
    }
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


    if(thisseeker.vx < -2){
        thisseeker.vx += .2;
    }
    if(thisseeker.vx > 2){
        thisseeker.vx -= .2;
    }
    if(thisseeker.vy < -2){
        thisseeker.vy += .2;
    }
    if(thisseeker.vy > 2){
        thisseeker.vy -= .2;
    }

    thisseeker.x += thisseeker.vx;
    thisseeker.y += thisseeker.vy;

    hexCorrect(thisseeker);
    collideRect(thisseeker, player, thisseeker.collideHandler, player.collideHandler);
    for (var i = bullets.children.length - 1; i >= 0; i--) {
        if (thisseeker.health > 0)
            collideRect(bullets.getChildAt(i), thisseeker, function(){bullCollideHandler(i)}, thisseeker.collideHandler);
    }
}