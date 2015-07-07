var snakewait = 60;
var snakesteps = 13;
var snakescore = 1500;

function spawnSnake(){
	var wholesnake = new PIXI.Container();
	wholesnake.health = 15;
	wholesnake.seed = Math.random() * PIXI.PI_2;
	var snakex = Math.floor(Math.cos(wholesnake.seed) * 240) + player.x;
	var snakey = Math.floor(Math.sin(wholesnake.seed) * 210) + player.y;
	wholesnake.hit = false;
	wholesnake.directions = new Array(20);
	wholesnake.directions[20] = getRandomInt(1,2);
	wholesnake.blownup = false;
	wholesnake.deathflail = 60;
	wholesnake.collideHandler = function(){
		wholesnake.health--;
		wholesnake.hit = true;
	};
	wholesnake.colors = [0xFF0020, 0xFF2A00, 0xFF7500, 0xFFC100, 0xF1FF00, 0xA5FF00, 0x5AFF00, 0x0FFF00, 0x00FF3C, 0x00FF87, 0x00FFD3, 0x00DFFF, 0x0093FF, 0x0048FF, 0x0200FF, 0x4E00FF, 0x9900FF, 0xE500FF, 0xFF00CD, 0xFF0081];
	for (i = 1; i <= 20; i++) {
		var snakebit = PIXI.Sprite.fromImage('beamer.png');
		snakebit.anchor.x = 0;
		snakebit.anchor.y = 0;
		snakebit.x = snakex;
		snakebit.y = snakey;
		hexCorrect(snakebit);
		snakebit.tint = wholesnake.colors[i];
		wholesnake.addChild(snakebit);
	}

	wholesnake.stepcounter = snakesteps;
	wholesnake.alpha = .8;
	snakes.addChild(wholesnake);
}

function upSnake(thissnake){
	if (!thissnake.blownup) {
		if (thissnake.health <= 0) {
			score += snakescore;
			thissnake.blownup = true;
			return 0;
		}
		thissnake.children.forEach(function (thissnakebit) {
			collideRect(player, thissnakebit, player.collideHandler, null);
			for (var i = bullets.children.length - 1; i >= 0; i--) {
				collideRect(bullets.getChildAt(i), thissnakebit, function(){bullCollideHandler(i)}, thissnake.collideHandler);
			};
		});
		if (thissnake.stepcounter == snakesteps) {
			while (true) {
				var newdir = getRandomInt(-2, 4);
				if (newdir == 0 || newdir == 3 || newdir == 4) {
					thissnake.directions.push(thissnake.directions[20]);
					break;
				} else if (newdir != -thissnake.directions[20]) {
					thissnake.directions.push(newdir);
					break;
				}
			}
			thissnake.directions.shift();
		} else if (thissnake.stepcounter <= 8 && thissnake.stepcounter > 0) {
			if (thissnake.stepcounter % 1 == 0) {
				thissnake.colors.push(thissnake.colors[1]);
				thissnake.colors.shift();
			}
			thissnake.children.forEach(function (thissnakebit) {
				var thisbit = thissnake.getChildIndex(thissnakebit);
				thissnakebit.tint = thissnake.colors[thisbit];
				switch (thissnake.directions[thisbit]) {
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
		if (thissnake.stepcounter > 0) {
			thissnake.stepcounter--;
		} else {
			thissnake.stepcounter = snakesteps;
		}
		if (thissnake.hit) {
			thissnake.children.forEach(function (thissnakebit) {
				thissnakebit.tint = 0xFFFFFF;
			});
			thissnake.hit = false;
		}
	} else {
		if (thissnake.deathflail > 0){
			for (i = 0; i < 20; i++) {
				if (thissnake.deathflail == i+40){
					thissnake.getChildAt(i).visible = false;
					if(i == 0) {
						if (getRandomInt(1, 3) == 2) {
							spawnMulti(thissnake.getChildAt(0).x, thissnake.getChildAt(0).y);
						}
					}
				}
				if ( 60 - thissnake.deathflail - i > 0 && 60 - thissnake.deathflail - i < 20){
					graphics.lineStyle(3, thissnake.colors[i], 1 / (60 - thissnake.deathflail - i));
					drawCircles(thissnake.getChildAt(i).x +.5 * thissnake.getChildAt(i).width, thissnake.getChildAt(i).y +.5 * thissnake.getChildAt(i).height, (60 - thissnake.deathflail - i));
				}
			}

		} else {
			thissnake.children.forEach(function (thissnakebit) {
				thissnake.removeChild(thissnakebit);
				thissnakebit.destroy();
			});
			thissnake.parent.removeChild(thissnake);
			thissnake.destroy();
			//this doesn't have the destroy children flag set, breaks code, investigate more
		}
		thissnake.deathflail--;
	}
}