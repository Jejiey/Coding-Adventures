var canvas = document.createElement("canvas");

CanvasScale = 0.2;

CreateCanvas();

function CreateCanvas() {
	CanvasMultiple = CanvasScale;

	canvas.id = "CursorLayer";
	canvas.width = 4000 * CanvasMultiple;
	canvas.height = 2000 * CanvasMultiple;
	canvas.style.zIndex = -8;
	canvas.style.position = "absolute; top: 10";
	canvas.style.border = "10px solid";

	var body = document.getElementsByTagName("body")[0];

	body.appendChild(canvas);

	cursorLayer = document.getElementById("CursorLayer");

	window.ctx = canvas.getContext("2d");

	ctx.fillStyle = "#1D1D1D";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

input = [prompt("input: "), prompt("input: ")];
doEverything();
function doEverything() {
	counter = 0;
	weights = new Array(input.length);
	output = new Array(input.length);

	for (i = 0; i < input.length; i++) {
		weights[i] = 0;
		output[i] = 0;
	}
	diff = new Array(input.length);
	correctOutput = [1, 1];
	while (floor(output) != correctOutput) {
		for (i = 0; i < input.length; i++) {
			diff[i] =
				(correctOutput[i] - output[i]) / Math.abs(correctOutput[i] - output[i]);

			weights[i] += (diff[i] * Math.random()) / 10;
			output[i] = input[i] * weights[i];
		}
		console.log(floor(output));
		counter++;
	}
	console.log(output, counter);
}

function floor(ToFloor) {
	rndArr = new Array(ToFloor.length);
	for (i = 0; i < ToFloor.length; i++) {
		rndArr[i] = Math.round(ToFloor[i]);
	}
	return rndArr;
}
