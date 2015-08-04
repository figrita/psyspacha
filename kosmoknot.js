var GWIDTH = 800;
var GHEIGHT = 650;
//size of the game as rendered
var MWIDTH = 600;
var MHEIGHT = 300;
//size of the playable, tiled map area
var RENDER_MARGIN = 80; //overlap of tiles, determines max sprite size
var shaker = 0; //holds offset amount of rendering map.  causes shake during collision
var renderer = new PIXI.WebGLRenderer(GWIDTH, GHEIGHT, {backgroundColor: 0x000000});
document.body.appendChild(renderer.view);
var gamePort;
var portContainer = new PIXI.Container();
var gameSprite;
var mapTexture;
var mapSprite;
var graphicTexture;
var graphicSprite;
var graphicPortTexture;
var graphicPortSprite;
var graphicPort;
var bg;
var bbg;
var bbgt;
var bulger = new BulgePinchFilter();

var graphics = new PIXI.Graphics();
var graphicsC = new PIXI.Container();
graphicsCC = new PIXI.Container();
graphicsC.addChild(graphics);
graphicsCC.addChild(graphicsC);


var container = new PIXI.Container();
var bullets = new PIXI.Container();
container.addChild(bullets);

var spats = new PIXI.Container();
container.addChild(spats);

var seekhives = new PIXI.Container();
container.addChild(seekhives);

var beamers = new PIXI.Container();
container.addChild(beamers);

var snakes = new PIXI.Container();
container.addChild(snakes);

var seekers = new PIXI.Container();
container.addChild(seekers);

var spitters = new PIXI.Container();
container.addChild(spitters);

var wingmans = new PIXI.Container();
container.addChild(wingmans);

var powerups = new PIXI.Container();
container.addChild(powerups);

var score = 0;

var loader = PIXI.loader;
loader.add('player', "playersprite.png");
loader.add('bullet', "bullet.png");
loader.add('beamer', "beamer.png");
loader.add('bg', "bg.png");
loader.add('bbg', "bbg.png");
loader.once('complete', create);
loader.load();

function create() {
	mapTexture = new PIXI.RenderTexture(renderer, MWIDTH + RENDER_MARGIN, MHEIGHT + RENDER_MARGIN, PIXI.SCALE_MODES.LINEAR, 1);
	mapSprite = new PIXI.Sprite(mapTexture);
	graphicTexture = new PIXI.RenderTexture(renderer, MWIDTH + 2*RENDER_MARGIN, MHEIGHT + 2*RENDER_MARGIN);
	graphicSprite = new PIXI.Sprite(graphicTexture);
	graphicPortTexture = new PIXI.RenderTexture(renderer, MWIDTH, MHEIGHT);
	graphicPortSprite = new PIXI.Sprite(graphicPortTexture);
	graphicPort = new PIXI.Container();
	graphicPort.addChild(graphicSprite);
	mapSprite.x = 0;
	mapSprite.y = 0;
	portContainer.addChild(mapSprite);
	gamePort = new PIXI.RenderTexture(renderer, GWIDTH, GHEIGHT, PIXI.SCALE_MODES.LINEAR, 1);
	gameSprite = new PIXI.Sprite(gamePort);
	gameSprite.anchor.set(0);
	bg = new PIXI.Sprite.fromImage("bg.png");
	bbgt = new PIXI.Texture.fromImage("bbg.png");
	bbg = new PIXI.extras.TilingSprite(bbgt, MWIDTH, MHEIGHT);
	bg.alpha = 0.6;
	bbg.alpha = 0.7;
	spawnPlayer();
	animate();
}

function update() {
	//beamers.children.forEach(upBeamer);
	for (var i = beamers.children.length - 1; i >= 0; i--) {
		upBeamer(beamers.getChildAt(i));
	}
	//snakes.children.forEach(upSnake);
	for (var i = snakes.children.length - 1; i >= 0; i--) {
		upSnake(snakes.getChildAt(i));
	}

	//spitters.children.forEach(upSpitter);
	for (var i = spitters.children.length - 1; i >= 0; i--) {
		upSpitter(spitters.getChildAt(i));
	}
	//spats.children.forEach(upSpat);
	for (var i = spats.children.length - 1; i >= 0; i--) {
		upSpat(spats.getChildAt(i));
	}

	for (var i = wingmans.children.length - 1; i >= 0; i--){
		upWingman(wingmans.getChildAt(i));
	}

	for ( var i = seekhives.children.length - 1; i >= 0; i--){
		upSeekhive(seekhives.getChildAt(i));
	}

	//seekers.children.forEach(upSeeker);
	for (var i = seekers.children.length - 1; i >= 0; i--) {
		upSeeker(seekers.getChildAt(i));
	}


	upPlayer();
	upBullet();
	upPowerups();
	levelMachine();
}

function animate() {
	input();
	update();
	render();
	requestAnimationFrame(animate);
}

// LOGIC FUNCTION BELOW

function hexCorrect(character) {
// essentially, the playable, logical map borders 6 duplicates.
// if the topleft corner of a sprite strays into a duplicate,
// just bring it back into the main one.  From the main tile, rendering
// and collision can be handled easily
	if (character.y >= 0 && character.y < MHEIGHT) {
		if (character.x >= 0 && character.x < MWIDTH) {
		}
		else if (character.x < 0) {
			character.x += MWIDTH;
		}
		else {
			character.x -= MWIDTH;
		}
	}
	else if (character.y < 0) {
		if (character.x < MWIDTH / 2) {
			character.y += MHEIGHT;
			character.x += MWIDTH / 2;
		}
		else {
			character.y += MHEIGHT;
			character.x -= MWIDTH / 2;
		}
	}
	else {
		if (character.x < MWIDTH / 2) {
			character.y -= MHEIGHT;
			character.x += MWIDTH / 2;
		}
		else {
			character.y -= MHEIGHT;
			character.x -= MWIDTH / 2;
		}
	}

}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pythag(x, y){
	return Math.sqrt((x * x) + (y * y));
}

function collideRect(object, target, collidehandlerobj, collidehandlertar) {
	if (object.y < target.y + target.height && target.y < object.y + object.height){
		if (object.x < target.x + target.width && target.x < object.x + object.width) {
			if (collidehandlerobj)
				collidehandlerobj();
			if (collidehandlertar)
				collidehandlertar();
			return 1;
		} else if (object.x < target.x + target.width - MWIDTH && target.x - MWIDTH < object.x + object.width){
			if(collidehandlerobj)
				collidehandlerobj();
			if (collidehandlertar)
				collidehandlertar();
			return 1;
		}
	} else if (object.y < target.y + target.height - MHEIGHT && target.y - MHEIGHT < object.y + object.height){
		if (object.x < target.x + target.width - (MWIDTH/2) && target.x - (MWIDTH/2) < object.x + object.width) {
			if(collidehandlerobj)
				collidehandlerobj();
			if (collidehandlertar)
				collidehandlertar();
			return 1;
		} else if (object.x < target.x + target.width + (MWIDTH/2) && target.x + (MWIDTH/2) < object.x + object.width){
			if(collidehandlerobj)
				collidehandlerobj();
			if (collidehandlertar)
				collidehandlertar();
			return 1;
		}
	} else {
		return 0;
	}
}

function drawCircles(x, y, width, height){
	graphics.drawCircle(Math.floor(x), Math.floor(y), width, height);/*
	graphics.drawCircle(x - MWIDTH, y, width, height);
	graphics.drawCircle(x + MWIDTH, y, width, height);
	graphics.drawCircle(.5 * MWIDTH + x, y + MHEIGHT, width, height);
	graphics.drawCircle(x - MWIDTH *.5, y + MHEIGHT, width, height);
	graphics.drawCircle(.5 * MWIDTH + x, y - MHEIGHT, width, height);
	graphics.drawCircle(x - MWIDTH *.5, y - MHEIGHT, width, height);*/
}
//graphics needs to render to a texture of size MWIDTHxMHEIGHT so that alpha doesn't overlap on edges