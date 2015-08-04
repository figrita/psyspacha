var beamerwait = 60;
var beamerscore = 1500;

function spawnBeamer() {
	beamerwait = 1000;
	var beamer = PIXI.Sprite.fromImage('beamer.png');
	beamers.addChild(beamer);
	beamer.spawntime = 20;
	beamer.deathflail = 0;
	beamer.health = 2;
	beamer.hit = false;
	beamer.anchor.x = 0;
	beamer.anchor.y = 0;
	beamer.colors = [0x00E5B5, 0x00E5B5, 0x06DDB0, 0x0DD5AB, 0x13CDA6, 0x1AC5A1, 0x20BD9C, 0x27B597, 0x2EAD92, 0x34A58E, 0x3B9D89, 0x419684, 0x488E7F, 0x4F867A, 0x557E75, 0x5C7670, 0x626E6C, 0x696667, 0x6F5E62, 0x76565D, 0x7D4E58, 0x834753, 0x8A3F4E, 0x90374A, 0x972F45, 0x9E2740, 0xA41F3B, 0xAB1736, 0xB10F31, 0xB8072C, 0xBF0028];
	beamer.tint = beamer.colors[0];
	beamer.cindex = 0;
	beamer.alpha = 1;
	beamer.seed = Math.random() * PIXI.PI_2;
	beamer.x = Math.floor(Math.cos(beamer.seed) * 240) + player.x;
	beamer.y = Math.floor(Math.sin(beamer.seed) * 210) + player.y;
	hexCorrect(beamer);
	beamer.vx = getRandomInt(1,2);
	beamer.vy = getRandomInt(1,2);
	if (getRandomInt(0,1)){
		beamer.vx = -beamer.vx;
	}
	if (getRandomInt(0,1)){
		beamer.vy = -beamer.vy;
	}
	beamer.collideHandler = function(){
		beamer.health--;
		beamer.hit = true;
	};
	beamer.firecounter = 120;//time until next firing
	beamer.beamlength = 60;//how long the beaming lasts
}

function upBeamer(thisbeamer){
	if (thisbeamer.spawntime){
		if(thisbeamer.spawntime % 3 == 0){
			thisbeamer.visible = false;
		} else {
			thisbeamer.visible = true;
		}
		thisbeamer.spawntime--;
		return;
	}
	if (thisbeamer.health <= 0  && thisbeamer.deathflail == 0) {
		score += beamerscore;
		thisbeamer.deathflail = 30;
	}
	if (thisbeamer.deathflail){
		thisbeamer.visible = false;
		graphics.lineStyle(3, 0xFFFFFF, 1 / ((30 - thisbeamer.deathflail) + 1));
		drawCircles(thisbeamer.x + thisbeamer.width *.5, thisbeamer.y +.5 * thisbeamer.height, (30 - thisbeamer.deathflail)*2);
		if (thisbeamer.deathflail === 1) {
			if (getRandomInt(0, 5) == 3)
				spawnHealth(thisbeamer.x, thisbeamer.y);
			beamers.removeChild(thisbeamer);
			thisbeamer.destroy();
		}
		thisbeamer.deathflail -= 1;
		return;
	}
	thisbeamer.x += thisbeamer.vx;
	thisbeamer.y += thisbeamer.vy;
	hexCorrect(thisbeamer);
	collideRect(thisbeamer, player, null, player.collideHandler);
	if (thisbeamer.firecounter > 0){
		if(thisbeamer.firecounter % 4 == 0){
			thisbeamer.cindex++;
			thisbeamer.tint = thisbeamer.colors[thisbeamer.cindex];
		}
		for (var i = bullets.children.length - 1; i >= 0; i--) {
			collideRect(bullets.getChildAt(i), thisbeamer, function(){bullCollideHandler(i)}, thisbeamer.collideHandler);
		}
		thisbeamer.firecounter--;
	} else {
		thisbeamer.firecounter = -1;
		thisbeamer.tint = 0xFFFFFF;
		fireBeam(thisbeamer);
		thisbeamer.cindex = 1;
	}
	if (thisbeamer.hit == true) {
		thisbeamer.tint = 0xFF0000;
		thisbeamer.hit = false;
	}
}

function fireBeam(thisbeamer){
	thisbeamer.vx = 0;
	thisbeamer.vy = 0;
	if (thisbeamer.beamlength > 0){
		if(thisbeamer.beamlength == 56 || thisbeamer.beamlength == 46){
			thisbeamer.visible = false;
		} else if(thisbeamer.beamlength == 52 || thisbeamer.beamlength == 40){
			thisbeamer. visible = true;
		}
		if(thisbeamer.beamlength <= 10 && thisbeamer.beamlength >= 2) {
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawRect(thisbeamer.x + thisbeamer.width/2 - thisbeamer.beamlength/2, 0, thisbeamer.beamlength, thisbeamer.y);
			graphics.drawRect(thisbeamer.x + thisbeamer.width/2 - thisbeamer.beamlength/2, thisbeamer.y + thisbeamer.height, thisbeamer.beamlength, MHEIGHT - (thisbeamer.y + thisbeamer.height));
			graphics.drawRect((thisbeamer.x + thisbeamer.width/2 - thisbeamer.beamlength/2 + MWIDTH / 2) % MWIDTH, 0, thisbeamer.beamlength, MHEIGHT);
			graphics.drawRect(0, thisbeamer.y + thisbeamer.height/2 - thisbeamer.beamlength/2, thisbeamer.x, thisbeamer.beamlength);
			graphics.drawRect(thisbeamer.x + thisbeamer.width, thisbeamer.y + thisbeamer.height/2 - thisbeamer.beamlength/2, MWIDTH - (thisbeamer.x + thisbeamer.width), thisbeamer.beamlength);
			graphics.endFill();
			if(player.y + player.height > thisbeamer.y && player.y < thisbeamer.y + thisbeamer.height){
				player.collideHandler();
			}
			if (player.x < thisbeamer.x + thisbeamer.width && player.x + player.width > thisbeamer.x){
				player.collideHandler();
			}
			if (player.x < thisbeamer.x + thisbeamer.width + MWIDTH/2 && player.x + player.width > thisbeamer.x + MWIDTH/2){
				player.collideHandler();
			}
		} else {
			for (var i = bullets.children.length - 1; i >= 0; i--) {
				if (thisbeamer.health > 0)
					collideRect(bullets.getChildAt(i), thisbeamer, function(){bullCollideHandler(i)}, thisbeamer.collideHandler);
			};
		}
		thisbeamer.beamlength--;
	} else {
		thisbeamer.beamlength = 60;
		thisbeamer.firecounter = 120;
		thisbeamer.vx = getRandomInt(1,2);
		thisbeamer.vy = getRandomInt(1,2);
		if (getRandomInt(0,1)){
			thisbeamer.vx = -thisbeamer.vx;
		}
		if (getRandomInt(0,1)){
			thisbeamer.vy = -thisbeamer.vy;
		}
	}
}