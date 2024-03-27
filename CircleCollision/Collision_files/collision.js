class dot {
	constructor(startingX, startingY) {
		this.X = startingX;
		this.Y = startingY;
		this.Xmoment = 0;
		this.Ymoment = 0;
		this.colour = "hsl( " + Math.random() * 360 + ",100%,60%)";
	}
}
class point {
	constructor(startingX, startingY) {
		this.X = startingX;
		this.Y = startingY;
	}
}
StyliseButtons();
var canvas = document.createElement("canvas");
CanvasMultiple = 0.2;
CreateCanvas();

var Bigspeed = CanvasMultiple * 5;

Pixelscale = 25 * CanvasMultiple;
var Width = canvas.width / Pixelscale;
var Height = canvas.height / Pixelscale;
var speed = 10 * Bigspeed;
var bounce = 0.05 * Bigspeed;
var centre = new point(canvas.width / 2, canvas.height / 2);

var drawingdot = 0;
CollisionTypes = ["bounce", "conserve", "swap", "skim"];
ColIndex = 3;
ColType = CollisionTypes[ColIndex]; //bounce, conserve, swap

var updatingspeed1 = 1;
var run = true;
var startingDots = new Array(100);

intilise();

wait1();
attractTocentre();
CreateStopButton();
CreateColSwitcherButton();
CreateSlider();

function intilise() {
	for (i = 0; i < startingDots.length; i++) {
		startingDots[i] = new dot(100 + Math.random() * 50, 100 + Math.random() * 50);
		draw(startingDots[i]);
	}
}

canvas.addEventListener("click", function (event) {
	RndIndex = Math.floor(Math.random() * startingDots.length);
	startingDots[RndIndex].X = event.clientX - Pixelscale / 1.5;
	startingDots[RndIndex].Y = event.clientY - Pixelscale / 1.5;
	startingDots[RndIndex].Xmoment = 0;
	startingDots[RndIndex].Ymoment = 0;
	false;
});

function wait1() {
	setTimeout(function () {
		if (run) {
			clearCanvas();
			startingDots.forEach(updateDots);
			attractTocentre();
			Momentum();
			wait1();
		}
	}, updatingspeed1);
}
function updateDots(dot) {
	collisions(dot);

	draw(dot);
}

function collisions(dot) {
	for (i = 0; i < startingDots.length; i++) {
		if (startingDots[i] != dot) {
			Xless = startingDots[i].X < dot.X + Pixelscale;
			Xmore = startingDots[i].X > dot.X - Pixelscale;
			Yless = startingDots[i].Y < dot.Y + Pixelscale;
			Ymore = startingDots[i].Y > dot.Y - Pixelscale;
			collide = Xless && Xmore && Yless && Ymore;
			if (collide && ColType == "bounce") {
				XMoveAmount = (bounce * (Pixelscale - (startingDots[i].X - dot.X))) / 2;
				YMoveAmount = (bounce * (Pixelscale - (startingDots[i].Y - dot.Y))) / 2;

				startingDots[i].Xmoment = -XMoveAmount;
				startingDots[i].Ymoment = -YMoveAmount;
				dot.Xmoment = XMoveAmount;
				dot.Ymoment = YMoveAmount;
			}
			if (collide && ColType == "conserve") {
				XMoveAmount =
					((startingDots[i].X - dot.X) / Math.abs(startingDots[i].X - dot.X)) *
					(Math.abs(startingDots[i].Xmoment) + Math.abs(dot.Xmoment));
				YMoveAmount =
					((startingDots[i].Y - dot.Y) / Math.abs(startingDots[i].Y - dot.Y)) *
					(Math.abs(startingDots[i].Ymoment) + Math.abs(dot.Ymoment));

				startingDots[i].Xmoment = -XMoveAmount / 2;
				startingDots[i].Ymoment = -YMoveAmount / 2;
				dot.Xmoment = XMoveAmount / 2;
				dot.Ymoment = YMoveAmount / 2;
			}
			if (collide && ColType == "swap") {
				DotX = dot.Xmoment;
				DotY = dot.Ymoment;
				OtherDotX = startingDots[i].Xmoment;
				OtherDotY = startingDots[i].Ymoment;
				dot.Xmoment = OtherDotX;
				dot.Ymoment = OtherDotY;
				startingDots[i].Xmoment = DotX;
				startingDots[i].Ymoment = DotY;
			}
			if (collide) {
				XMoveAmount = (0.1 * (Pixelscale - (startingDots[i].X - dot.X))) / 2;
				YMoveAmount = (0.1 * (Pixelscale - (startingDots[i].Y - dot.Y))) / 2;

				startingDots[i].X += -XMoveAmount;
				startingDots[i].Y += -YMoveAmount;
				dot.X += XMoveAmount;
				dot.Y += YMoveAmount;
			}
		}
	}
}

function attractTocentre() {
	for (i = 0; i < startingDots.length; i++) {
		dot = startingDots[i];
		dotdist = Math.sqrt(
			Math.pow(dot.X - centre.X, 2) + Math.pow(dot.Y - centre.Y, 2)
		);
		anglebet = Math.atan((centre.Y - dot.Y) / (centre.X - dot.X));
		anglebet = Math.abs(anglebet);
		if (dot.X > centre.X + 10)
			dot.Xmoment -= (speed / dotdist) * Math.cos(anglebet);
		if (dot.X < centre.X - 10)
			dot.Xmoment += (speed / dotdist) * Math.cos(anglebet);
		if (dot.Y < centre.Y - 10)
			dot.Ymoment += (speed / dotdist) * Math.sin(anglebet);
		if (dot.Y > centre.Y + 10)
			dot.Ymoment -= (speed / dotdist) * Math.sin(anglebet);

		startingDots[i] = dot;
	}
}
function Momentum() {
	for (i = 0; i < startingDots.length; i++) {
		dot = startingDots[i];
		dot.X += dot.Xmoment;
		dot.Y += dot.Ymoment;
		startingDots[i] = dot;
	}
}

function draw(dot) {
	ctx.fillStyle = dot.colour;
	ctx.fillRect(dot.X, dot.Y, Pixelscale, Pixelscale);
}

function CreateStopButton() {
	let btn = document.createElement("button");
	btn.innerHTML = "Pause/Play";
	btn.className = "button";

	btn.onclick = function () {
		console.log(startingDots);
		if (run) {
			run = false;
			btn.style.backgroundColor = "red";
		} else {
			run = true;
			btn.style.backgroundColor = "green";
		}

		wait1();
	};
	document.body.appendChild(btn);
}

function CreateColSwitcherButton() {
	let btn = document.createElement("button");
	btn.innerHTML = "Collision Type: " + ColType;
	btn.className = "button";
	btn.style.backgroundColor = "hsl(" + ColIndex * 90 + ", 100%,30%)";

	btn.onclick = function () {
		ColIndex++;
		if (ColIndex > CollisionTypes.length - 1) ColIndex = 0;
		ColType = CollisionTypes[ColIndex];

		btn.innerHTML = "Collision Type: " + ColType;
		btn.style.backgroundColor = "hsl(" + ColIndex * 90 + ", 100%,30%)";
	};
	document.body.appendChild(btn);
}

function clearCanvas() {
	ctx.globalCompositeOperation = "luminosity";
	//ctx.filter = "blur(5px)";
	ctx.fillStyle = "rgba(0, 0, 0,0.1)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.globalCompositeOperation = "source-over";
}

function CreateCanvas() {
	CanvasMultiple;

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

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function StyliseButtons() {
	var styles = `.button {
background-color: green;
border: none;
color: white;
padding: 15px 32px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 3px 10px;
cursor: pointer;


}`;

	var styleSheet = document.createElement("style");
	styleSheet.innerText = styles;
	document.head.appendChild(styleSheet);
}
function CreateSlider() {
	let slider = document.createElement("input");
	slider.innerHTML = "range";
	slider.type = "range";
	slider.value = "25";

	document.body.appendChild(slider);

	slider.oninput = function () {
		speed = (this.value / 5) * Bigspeed;
	};
}
function CreateSlider() {
	let slider = document.createElement("input");
	slider.innerHTML = "range";
	slider.type = "range";
	slider.value = "25";

	document.body.appendChild(slider);

	slider.oninput = function () {
		speed = (this.value / 5) * Bigspeed;
	};
}
