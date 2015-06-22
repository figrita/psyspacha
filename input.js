// keycodes
var left = keyboard(37),
	up = keyboard(38),
	right = keyboard(39),
	down = keyboard(40);

var keyx = 0,
	keyy = 0;

var wKey = keyboard(87),
	aKey = keyboard(65),
	sKey = keyboard(83),
	dKey = keyboard(68);
// /keycodes

function input() {
	left.press = function() {
		--keyx;
	};
	left.release = function() {
		++keyx;
	};

	up.press = function() {
		--keyy;
	};
	up.release = function() {
		++keyy;
	};

	right.press = function() {
		++keyx;
	};
	right.release = function() {
		--keyx;
	};

	down.press = function() {
		++keyy;
	};
	down.release = function() {
		--keyy;
	};

	aKey.press = function() {
		--bulx;
	};

	aKey.release = function() {
		++bulx;
	};

	wKey.press = function() {
		--buly;
	};
	wKey.release = function() {
		++buly;
	};

	dKey.press = function() {
		++bulx;
	};
	dKey.release = function() {
		--bulx;
	};

	sKey.press = function() {
		++buly;
	};
	sKey.release = function() {
		--buly;
	};

}

function keyboard(keyCode) {
	var key = {};
	key.code = keyCode;
	key.isDown = false;
	key.isUp = true;
	key.press = undefined;
	key.release = undefined;
	//The `downHandler`
	key.downHandler = function(event) {
		if (event.keyCode === key.code) {
			if (key.isUp && key.press) key.press();
			key.isDown = true;
			key.isUp = false;
		}
		event.preventDefault();
	};

	//The `upHandler`
	key.upHandler = function(event) {
		if (event.keyCode === key.code) {
			if (key.isDown && key.release) key.release();
			key.isDown = false;
			key.isUp = true;
		}
		event.preventDefault();
	};

	//Attach event listeners
	window.addEventListener(
		"keydown", key.downHandler.bind(key), false
	);
	window.addEventListener(
		"keyup", key.upHandler.bind(key), false
	);
	return key;
}