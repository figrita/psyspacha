function renderMap(x, y, clearit) {
	if (clearit)
		gamePort.clear();
	mapSprite.x = x + GWIDTH/2 - player.width/2 - player.x;
	mapSprite.y = y + GHEIGHT/2 - player.height/2 - player.y;
	gamePort.render(portContainer);
	/*if (clearit) {
		renderer.clearBeforeRender = false;
	}*/
}

function render() {
	mapTexture.clear();
	mapTexture.render(container);
	mapTexture.render(beamgfx);
	beamgfx.clear();
//  i is rows, even rows are shifted a half-map to the left
//  the clearBeforeRender flag goes off when rendering the topright corner
//  and no other
//  the conditionals remove duplicate renderings.
//	the mapSprite is rendered multiple times per tile for when sprites rest
//	on borders

	for (var i = 0; i < ty + 1; i++) {
		if (i % 2 === 0) {
			for (var j = 0; j < tx; j++) {
				renderMap(j * MWIDTH, i * MHEIGHT, i === 0 && j === 0);
				if (j === 0) {
					renderMap((j - 1) * MWIDTH, i * MHEIGHT, false);
					if (i === 0) {
						renderMap((j - .5) * MWIDTH, (i - 1) * MHEIGHT, false);
						renderMap((j - 1.5) * MWIDTH, (i - 1) * MHEIGHT, false);//adding this square for player centered movement
					}
				}
				renderMap((j + .5) * MWIDTH, (i - 1) * MHEIGHT, false);
			}
		}
		else {
			for (j = 0; j <= tx + 1; j++) {
				renderMap((j - .5) * MWIDTH, i * MHEIGHT, false);
				if (j === 0) {
					renderMap((j - 1.5) * MWIDTH, i * MHEIGHT, false);
					if (i === 0) {
						renderMap((j - 1) * MWIDTH, (i - 1) * MHEIGHT, false);
					}
				}
				renderMap(j * MWIDTH, (i - 1) * MHEIGHT, false);

			}
		}
	}
	renderer.clearBeforeRender = true;
	/*gameSprite.scale.x = 1 + Math.sin(count) * 0.02;
	gameSprite.scale.y = 1 + Math.sin(count) * 0.02;
	count += 0.02;*/
	gameSprite.filters = [bulger];
	renderer.render(gameSprite);
	renderer.clearBeforeRender = false;
	renderer.render(text);
}
