var beamerwait = 60;
var beamerscore = 1500;

function spawnBeamer() {
	beamerwait = 1000;
	var beamer = PIXI.Sprite.fromImage('beamer.png');
	beamers.addChild(beamer);
	beamer.health = 3;
	beamer.anchor.x = 0;
	beamer.anchor.y = 0;
	beamer.tint = 0x99FF00;
	beamer.alpha = 1;
	beamer.x = getRandomInt(0,MWIDTH);
	beamer.y = getRandomInt(0,MHEIGHT);
	beamer.vx = getRandomInt(1,2);
	beamer.vy = getRandomInt(1,2);
	if (getRandomInt(0,1)){
		beamer.vx = -beamer.vx;
	}
	if (getRandomInt(0,1)){
		beamer.vy = -beamer.vy;
	}
	beamer.firecounter = 120;//time until next firing
	beamer.beamlength = 60;//how long the beaming lasts
}

function upBeamer(thisbeamer){
	if (thisbeamer.health <= 0){
		score += beamerscore;
		thisbeamer.parent.removeChild(thisbeamer);
		thisbeamer.destroy();
	}
	thisbeamer.x += thisbeamer.vx;
	thisbeamer.y += thisbeamer.vy;
	hexCorrect(thisbeamer);
	if (thisbeamer.firecounter > 0){
		thisbeamer.tint += 0x000011;
		thisbeamer.tint = (thisbeamer.tint % 0x99FFFF) + 0x99FF00;
		thisbeamer.firecounter--;
	} else {
		thisbeamer.firecounter = -1;
		thisbeamer.tint = 0xFFFFFF;
		fireBeam(thisbeamer);
	}
}

function fireBeam(thisbeamer){
	thisbeamer.vx = 0;
	thisbeamer.vy = 0;
	if (thisbeamer.beamlength > 0){
		if(thisbeamer.beamlength == 56 || thisbeamer.beamlength == 46){
			thisbeamer.visible = false;
		}
		if(thisbeamer.beamlength == 52 || thisbeamer.beamlength == 40){
			thisbeamer. visible = true;
		}
		if(thisbeamer.beamlength <= 10 && thisbeamer.beamlength >= 2) {
			beamgfx.beginFill(0xFFFFFF, 1)
			beamgfx.drawRect(thisbeamer.x + thisbeamer.width/2 - thisbeamer.beamlength/2, 0, thisbeamer.beamlength, thisbeamer.y);
			beamgfx.drawRect(thisbeamer.x + thisbeamer.width/2 - thisbeamer.beamlength/2, thisbeamer.y + thisbeamer.height, thisbeamer.beamlength, MHEIGHT - (thisbeamer.y + thisbeamer.height));
			beamgfx.drawRect((thisbeamer.x + thisbeamer.width/2 - thisbeamer.beamlength/2 + MWIDTH / 2) % MWIDTH, 0, thisbeamer.beamlength, MHEIGHT);
			beamgfx.drawRect(0, thisbeamer.y + thisbeamer.height/2 - thisbeamer.beamlength/2, thisbeamer.x, thisbeamer.beamlength);
			beamgfx.drawRect(thisbeamer.x + thisbeamer.width, thisbeamer.y + thisbeamer.height/2 - thisbeamer.beamlength/2, MWIDTH - (thisbeamer.x + thisbeamer.width), thisbeamer.beamlength);
			beamgfx.endFill();
		};
		thisbeamer.beamlength--;
	} else {
		thisbeamer.beamlength = 60;
		thisbeamer.firecounter = 500;
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