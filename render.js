function renderMap(x, y) {
	mapSprite.x = x + GWIDTH/2 - player.width/2 - player.x;
	mapSprite.y = y + GHEIGHT/2 - player.height/2 - player.y;
	gamePort.render(portContainer);
	/*if (clearit) {
		renderer.clearBeforeRender = false;
	}*/
}

function render() {
	mapTexture.clear();
	bbg.x = -player.x * (.5);
	bbg.y = -player.y * (.5);
	mapTexture.render(bbgc);
	mapTexture.render(bg);
	mapTexture.render(container);
	mapTexture.render(beamgfx);
	beamgfx.clear();
	gamePort.clear();


	//This tiles the Map on the Sphere.  It is important to render from the bottom right corner,
	// because the sprites overflow on the bottom and right edges. this way the BG does not render over the sprites
	if (player.y > MHEIGHT - 90) {
		renderMap(MWIDTH, 2 * MHEIGHT);
		renderMap(0, 2 * MHEIGHT);
		renderMap(-MWIDTH, 2 * MHEIGHT);
	}

	renderMap(1.5 * MWIDTH, MHEIGHT);
	renderMap(.5 * MWIDTH, MHEIGHT);
	renderMap(-.5 * MWIDTH, MHEIGHT);
	renderMap(-1.5 * MWIDTH, MHEIGHT);

	renderMap(MWIDTH, 0);
	renderMap(0,0);
	renderMap(-MWIDTH, 0);

	renderMap(1.5 * MWIDTH, -MHEIGHT);
	renderMap(.5 * MWIDTH, -MHEIGHT);
	renderMap(-.5 * MWIDTH, -MHEIGHT);
	renderMap(-1.5 * MWIDTH, -MHEIGHT);

	if (player.y < 90) {
		renderMap(MWIDTH, -2 * MHEIGHT);
		renderMap(0, -2 * MHEIGHT);
		renderMap(-MWIDTH, -2 * MHEIGHT);
	}

	renderer.clearBeforeRender = true;
	/*gameSprite.scale.x = 1 + Math.sin(count) * 0.02;
	gameSprite.scale.y = 1 + Math.cos(count) * 0.02;
	count += 0.1;*/
	gameSprite.filters = [bulger];
	renderer.render(gameSprite);
	renderer.clearBeforeRender = false;
	renderer.render(text);
}
