var GWIDTH = 800;
var GHEIGHT = 650;
//size of the game as rendered

var MWIDTH = 600;
var MHEIGHT = 300;
//size of the playable, tiled map area

var score = 0;

var RENDER_MARGIN = 80;

var renderer = new PIXI.WebGLRenderer(GWIDTH, GHEIGHT, {backgroundColor: 0x000000});
document.body.appendChild(renderer.view);

var gamePort;
var portContainer = new PIXI.Container();
var gameSprite;
var bulger = new BulgePinchFilter();
var count = 0;
var container = new PIXI.Container();
var bullets = new PIXI.Container();
container.addChild(bullets);

var beamers = new PIXI.Container();
var beamgfx = new PIXI.Graphics();
container.addChild(beamers);

var snakes = new PIXI.Container();
container.addChild(snakes);

var powerups = new PIXI.Container();
container.addChild(powerups);

var bulx = 0,//input counters
	buly = 0;
var bulvx = 0,
	bulvy = 0;
var bulwait = 0;//timer for next bullet
var multishoot = false;
var multitime = 0;
var cs2 = Math.cos(.15);
var sn2 = Math.sin(.15);
var cs3 = Math.cos(-.15);
var sn3 = Math.sin(-.15);

var player;
var mapTexture;
var mapSprite;
var ty = GHEIGHT / MHEIGHT;
var tx = GWIDTH / MWIDTH;

var tinter = 0x000005;//value to tint player by
var tintd = 0x000020;//value to change tinter by

var loader = PIXI.loader;
loader.add('player', "playersprite.png");
loader.add('bullet', "bullet.png");
loader.add('beamer', "beamer.png");
loader.once('complete', create);
loader.load();

function create() {
	mapTexture = new PIXI.RenderTexture(renderer, MWIDTH + RENDER_MARGIN, MHEIGHT + RENDER_MARGIN, PIXI.SCALE_MODES.LINEAR, 1);
	mapSprite = new PIXI.Sprite(mapTexture);
	mapSprite.x = 0;
	mapSprite.y = 0;
	portContainer.addChild(mapSprite);
	gamePort = new PIXI.RenderTexture(renderer, GWIDTH, GHEIGHT, PIXI.SCALE_MODES.LINEAR, 1);
	gameSprite = new PIXI.Sprite(gamePort);
	gameSprite.anchor.set(0.5);
	gameSprite.x = GWIDTH/2;
	gameSprite.y = GHEIGHT/2;
	spawnPlayer();
	animate();
}

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

function drawMore(x, y, width, height){
	beamgfx.drawCircle(x, y, width, height);
	beamgfx.drawCircle(x + MWIDTH, y, width, height);
	beamgfx.drawCircle(.5 * MWIDTH + x, y + MHEIGHT, width, height);
	beamgfx.drawCircle(x - MWIDTH *.5, y + MHEIGHT, width, height);
}

function update() {
	beamers.children.forEach(upBeamer);
	snakes.children.forEach(upSnake);
	upPlayer();
	upBullet();
	upPowerups();
	levelMachine(level1);
	scoretext.text = "Score: " + score;
}

function animate() {
	input();
	update();
	render();
	requestAnimationFrame(animate);
}

