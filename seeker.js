var hypot = 300;// this is the furthest possible pythag two things can be
var seekerscore = 2500;

function pythag(x, y){
    return Math.sqrt((x * x) + (y * y));
}

function spawnSeeker() {
    var seeker = PIXI.Sprite.fromImage('beamer.png');
    seekers.addChild(seeker);
    seeker.health = 2;
    seeker.hit = false;
    seeker.anchor.x = 0;
    seeker.anchor.y = 0;
    seeker.tint = 0xFFFF00;
    seeker.cindex = 0;
    seeker.alpha = 1;
    seeker.seed = Math.random() * PIXI.PI_2;
    seeker.x = Math.cos(seeker.seed) * 240 + player.x;
    seeker.y = Math.sin(seeker.seed) * 210 + player.y;
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

function upSeeker(thisseeker){
    if (thisseeker.health <= 0){
        score += seekerscore;
        seekers.removeChild(thisseeker);
        thisseeker.destroy();
        return 0;
    }

    thisseeker.goalx = player.x - thisseeker.x;
    thisseeker.goaly = player.y - thisseeker.y;


//This is pretty gross, but it works for now
    //traverse around each adjacent tile and check for the pythag
    //would be better to get the minimum, but this works well
    if(pythag(thisseeker.goalx, thisseeker.goaly) > hypot){
        thisseeker.goalx -= MWIDTH;
        if(pythag(thisseeker.goalx, thisseeker.goaly) > hypot){
            thisseeker.goalx += 2 * MWIDTH;
            if(pythag(thisseeker.goalx, thisseeker.goaly) > hypot){
                thisseeker.goalx -= .5 * MWIDTH;
                thisseeker.goaly -= MHEIGHT;
                if(pythag(thisseeker.goalx, thisseeker.goaly) > hypot){
                    thisseeker.goaly += 2* MHEIGHT;
                    if(pythag(thisseeker.goalx, thisseeker.goaly) > hypot){
                        thisseeker.goalx -= MWIDTH;
                        if(pythag(thisseeker.goalx, thisseeker.goaly) > hypot){
                            thisseeker.goaly -= 2* MHEIGHT;
                        }
                    }
                }
            }
        }
    }

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


    if(thisseeker.vx < -4){
        thisseeker.vx += .2;
    }
    if(thisseeker.vx > 4){
        thisseeker.vx -= .2;
    }
    if(thisseeker.vy < -4){
        thisseeker.vy += .2;
    }
    if(thisseeker.vy > 4){
        thisseeker.vy -= .2;
    }

    thisseeker.x += thisseeker.vx;
    thisseeker.y += thisseeker.vy;

    hexCorrect(thisseeker);
    collideRect(thisseeker, player, thisseeker.collideHandler, player.collideHandler);
    bullets.children.forEach(function (thisbullet) {
        collideRect(thisbullet, thisseeker, thisbullet.collideHandler, thisseeker.collideHandler);
    });
}