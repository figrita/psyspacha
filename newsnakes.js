var snakewait = 60;
var snakesteps = 30;

function spawnSnake(){
    var snakex = getRandomInt(0, MWIDTH);
    var snakey = getRandomInt(0, MHEIGHT);
    var wholesnake = new PIXI.Container();
    wholesnake.health = 12;
    wholesnake.hit = false;
    wholesnake.directions = new Array(20);
    wholesnake.directions[20] = getRandomInt(1,2);
    //wholesnake.blownup = false;
    //wholesnake.colors = [0xFF0020, 0xFF2A00, 0xFF7500, 0xFFC100, 0xF1FF00, 0xA5FF00, 0x5AFF00, 0x0FFF00, 0x00FF3C, 0x00FF87, 0x00FFD3, 0x00DFFF, 0x0093FF, 0x0048FF, 0x0200FF, 0x4E00FF, 0x9900FF, 0xE500FF, 0xFF00CD, 0xFF0081];
    for (i = 1; i <= 20; i++){
        var snakebit = PIXI.Sprite.fromImage('newerpart.png');
        snakebit.anchor.x = 0;
        snakebit.anchor.y = 0;
        snakebit.x = snakex;
        snakebit.y = snakey;
        //snakebit.tint = wholesnake.colors[i];
        snakebit.collideHandler = function(){
            wholesnake.health--;
            wholesnake.hit = true;
        };
        wholesnake.addChild(snakebit);
    }

    wholesnake.stepcounter = snakesteps;
    //wholesnake.alpha = .8;
    snakes.addChild(wholesnake);
}

function upSnake(thissnake){
    if (thissnake.health <= 0){
        score += 1500;
        thissnake.children.forEach(function(thissnakebit){
            thissnake.removeChild(thissnakebit);
            thissnakebit.destroy();
        });
        thissnake.parent.removeChild(thissnake);
        thissnake.destroy();
        //this doesn't have the destroy children flag set, breaks code, investigate more
        return 0;
    }
    thissnake.children.forEach(function(thissnakebit){
        collideRect(player,thissnakebit, 1, 0);
        bullets.children.forEach(function(thisbullet){
            collideRect(thisbullet, thissnakebit, 1, 1);
        });
    });
    if (thissnake.stepcounter == snakesteps){
        while(true){
            var newdir = getRandomInt(-2, 4);
            if(newdir == 0 || newdir == 3 || newdir == 4){
                thissnake.directions.push(thissnake.directions[20]);
                break;
            } else if (newdir != -thissnake.directions[20]){
                thissnake.directions.push(newdir);
                break;
            }
        }
        thissnake.directions.shift();
    } else if (thissnake.stepcounter <= 30 && thissnake.stepcounter > 0){
        if (thissnake.stepcounter % 3 == 0){
            //thissnake.colors.push(thissnake.colors[1]);
            //thissnake.colors.shift();
        }
        thissnake.children.forEach(function(thissnakebit){
            var thisbit = thissnake.getChildIndex(thissnakebit);
            //thissnakebit.tint = thissnake.colors[thisbit];
            switch(thissnake.directions[thisbit]){
                case -2:
                    thissnakebit.x -= 2;
                    break;
                case 2:
                    thissnakebit.x += 2;
                    break;
                case -1:
                    thissnakebit.y -= 2;
                    break;
                case 1:
                    thissnakebit.y += 2;
            }
            hexCorrect(thissnakebit);
        });
    }
    if (thissnake.stepcounter > 0){
        thissnake.stepcounter--;
    } else {
        thissnake.stepcounter = snakesteps;
    }
    if (thissnake.hit){
        thissnake.children.forEach(function(thissnakebit){
            thissnakebit.tint = 0xFF0000;
        });
        thissnake.hit = false;
    } else {
        thissnake.children.forEach(function(thissnakebit){
            thissnakebit.tint = 0xFFFFFF;
        });
    }
}