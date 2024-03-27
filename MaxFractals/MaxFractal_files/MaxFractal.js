var canvas = document.createElement("canvas");

CanvasScale = 1000;

CreateCanvas();

function CreateCanvas() {
	canvas.id = "CursorLayer";
	canvas.width = CanvasScale;
	canvas.height = CanvasScale;
	canvas.style.zIndex = -8;
	canvas.style.position = "absolute; top: 10";
	canvas.style.border = "10px solid";

	var body = document.getElementsByTagName("body")[0];

	body.appendChild(canvas);

	cursorLayer = document.getElementById("CursorLayer");

	window.ctx = canvas.getContext("2d");

	ctx.fillStyle = "#1D1D1D";
	ctx.fillRect(0, 0, CanvasScale, CanvasScale);
}
class ScrnPix {
	constructor() {
		this.a = new Array(CanvasScale); // pixels[x][y] (duh)
		for (let i = 0; i < CanvasScale; i++) {
			this.a[i] = new Array(CanvasScale);
		}

		for (let i = 0; i < CanvasScale; i++) {
			for (let j = 0; j < CanvasScale; j++) {
				this.a[i][j] = 0;
			}
		}
	}
}
Pixels = new ScrnPix();
Pixels = Pixels.a;
Pixels[CanvasScale / 2][CanvasScale / 2] = 1;
runs = 10;
run = 0;

while (run < runs) {
	Out = checkPoints(Pixels, 60, run);
	Pixels = Out[0];
	drawPoints(Pixels, Out[1], run);
	run++;
}

function checkPoints(arr, angle, run) {
	run++;
	let Narr = new ScrnPix();
	Narr = Narr.a;
	Lstate = 0;
	for (let Xvalue = 0; Xvalue < CanvasScale; Xvalue++) {
		for (let Yvalue = 0; Yvalue < CanvasScale; Yvalue++) {
			Xdistfromcentre = CanvasScale / 2 - Xvalue;
			Ydistfromcentre = CanvasScale / 2 - Yvalue;
			distfromcentre = (Xdistfromcentre ** 2 + Ydistfromcentre ** 2) ** 0.5;
			//multiplier = CanvasScale / 2 - Math.abs(distfromcentre); // distance to points sampled
			multiplier = (0.5 ** run * CanvasScale) / 2;
			numP = 360 / angle; //number of points sampled
			Sum = 0; //sum of points sampled
			for (let i = 1; i < numP + 1; i++) {
				Pangle = 30 + angle * i;
				RadAngle = (Pangle * Math.PI) / 180;
				NabX = Xvalue + multiplier * Math.cos(RadAngle);
				NabY = Yvalue + multiplier * Math.sin(RadAngle);
				NabX = Math.round(NabX);
				NabY = Math.round(NabY);
				if (NabX >= 0 && NabY >= 0 && NabX < CanvasScale && NabY < CanvasScale) {
					Sum += arr[NabX][NabY];
				}
			}
			state = Sum / numP;
			if (arr[Xvalue][Yvalue] == 0) Narr[Xvalue][Yvalue] = state;
			if (state > Lstate) Lstate = state;
		}
	}
	return [Narr, Lstate];
}

function drawPoints(arr, Lvalue) {
	for (let Xvalue = 0; Xvalue < CanvasScale; Xvalue++) {
		for (let Yvalue = 0; Yvalue < CanvasScale; Yvalue++) {
			value = (Math.log(1 + arr[Xvalue][Yvalue]) * 100) / Math.log(1 + Lvalue);
			ctx.fillStyle = "hsl(160, 100%," + value + "%)";

			if (arr[Xvalue][Yvalue] > 0) {
				ctx.fillRect(Xvalue, Yvalue, 1, 1);
			}
		}
	}
}

//Test(60);
function Test(angle) {
	Xvalue = 150;
	Yvalue = 560;
	Xdistfromcentre = CanvasScale / 2 - Xvalue;
	Ydistfromcentre = CanvasScale / 2 - Yvalue;
	distfromcentre = (Xdistfromcentre ** 2 + Ydistfromcentre ** 2) ** 0.5;
	multiplier = CanvasScale / 2 - Math.abs(distfromcentre); // distance to points sampled
	numP = 360 / angle; //number of points sampled
	for (let i = 0; i < numP; i++) {
		Pangle = 30 + angle * i;
		RadAngle = (Pangle * Math.PI) / 180;
		NabX = Xvalue + multiplier * Math.cos(RadAngle);
		NabY = Yvalue + multiplier * Math.sin(RadAngle);
		NabX = Math.floor(NabX);
		NabY = Math.floor(NabY);
		if (NabX >= 0 && NabY >= 0 && NabX < CanvasScale && NabY < CanvasScale) {
			Sum += Pixels[NabX][NabY];
		}
		console.log("multi: ", multiplier);

		console.log(NabX, NabY, Pixels[NabX][NabY]);
	}
}
