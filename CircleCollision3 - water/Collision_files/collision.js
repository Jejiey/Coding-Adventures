class dot {
 constructor(startingX, startingY) {
  this.X = startingX;
  this.Y = startingY;
  this.Xmoment = 0;
  this.Ymoment = 0;
  this.colour = "#00A4DD";
  this.cellHoz = 0;
  this.cellVert = 0;
  this.cellIndex = 0;
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

Pixelscale = 50 * CanvasMultiple;
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

var CellWidth = Pixelscale;
var CellHeight = Pixelscale;
var prevHoz = [];
var prevVert = [];
var Cells = new Array(Math.floor(canvas.width / CellWidth) + 1);
cellCreate();

intilise();

wait1();
attractToBottom();
CreateStopButton();
CreateColSwitcherButton();
CreateSlider();

function cellCreate() {
 for (i = 0; i < Cells.length; i++) {
  Cells[i] = new Array(Math.floor(canvas.height / CellHeight));
  for (j = 0; j < Cells[i].length; j++) {
   Cells[i][j] = [];
  }
 }
}

function intilise() {
 for (i = 0; i < startingDots.length; i++) {
  startingDots[i] = new dot(
   Math.random() * Width * Pixelscale,
   Math.random() * Height * Pixelscale
  );
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
   attractToBottom();
   Momentum();
   wait1();
  }
 }, updatingspeed1);
}
function updateDots(dot) {
 WallColisions(dot);
 FindCell(dot);
 collisions(dot);
 draw0(dot);
}
function collisions(dot) {
 for (i = dot.cellHoz - 1; i <= dot.cellHoz + 1; i++) {
  if (i >= 0 && i < Cells.length) {
   prevHoz.push(i);
   for (j = dot.cellVert - 1; j <= dot.cellVert + 1; j++) {
    if (j >= 0 && j < Cells[i].length) {
     //if (!(prevHoz.includes(i) && prevVert.includes(j))) {
     prevVert.push(j);
     for (k = 0; k < Cells[i][j].length; k++) {
      if (Cells[i][j][k] != dot) {
       CheckCollide(dot, Cells[i][j][k]);
      }
     }
     //	}
    }
   }
  }
 }
}

function CheckCollide(dot, Odot) {
 Xless = Odot.X < dot.X + Pixelscale;
 Xmore = Odot.X > dot.X - Pixelscale;
 Yless = Odot.Y < dot.Y + Pixelscale;
 Ymore = Odot.Y > dot.Y - Pixelscale;
 collide = Xless && Xmore && Yless && Ymore;
 if (collide && ColType == "bounce") {
  XMoveAmount = (bounce * (Pixelscale - (Odot.X - dot.X))) / 2;
  YMoveAmount = (bounce * (Pixelscale - (Odot.Y - dot.Y))) / 2;

  Odot.Xmoment = -XMoveAmount;
  Odot.Ymoment = -YMoveAmount;
  dot.Xmoment = XMoveAmount;
  dot.Ymoment = YMoveAmount;
 }
 if (collide && ColType == "conserve") {
  XMoveAmount =
   ((Odot.X - dot.X) / Math.abs(Odot.X - dot.X)) *
   (Math.abs(Odot.Xmoment) + Math.abs(dot.Xmoment));
  YMoveAmount =
   ((Odot.Y - dot.Y) / Math.abs(Odot.Y - dot.Y)) *
   (Math.abs(Odot.Ymoment) + Math.abs(dot.Ymoment));

  Odot.Xmoment = -XMoveAmount / 2;
  Odot.Ymoment = -YMoveAmount / 2;
  dot.Xmoment = XMoveAmount / 2;
  dot.Ymoment = YMoveAmount / 2;
 }
 if (collide && ColType == "swap") {
  DotX = dot.Xmoment;
  DotY = dot.Ymoment;
  OtherDotX = Odot.Xmoment;
  OtherDotY = Odot.Ymoment;
  dot.Xmoment = OtherDotX;
  dot.Ymoment = OtherDotY;
  Odot.Xmoment = DotX;
  Odot.Ymoment = DotY;
 }
 if (collide) {
  XMoveAmount = (0.1 * (Pixelscale - (Odot.X - dot.X))) / 2;
  YMoveAmount = (0.1 * (Pixelscale - (Odot.Y - dot.Y))) / 2;

  Odot.X += -XMoveAmount;
  Odot.Y += -YMoveAmount;
  dot.X += XMoveAmount;
  dot.Y += YMoveAmount;
 }
}
function WallColisions(dot) {
 //left
 if (dot.X < 0) {
  dot.X = 1;
  dot.Xmoment *= -0.4;
 }
 //right
 if (dot.X > canvas.width) {
  dot.X = canvas.width - Pixelscale;
  dot.Xmoment *= -0.4;
 }
 //bottom
 if (dot.Y > canvas.height) {
  dot.Y = canvas.height - Pixelscale;
  dot.Ymoment *= -0.4;
 }
 //top
 if (dot.Y < 0) {
  dot.Y = 1;
  dot.Ymoment *= -0.4;
 }
}

function FindCell(dot) {
 Cells[dot.cellHoz][dot.cellVert].splice(dot.cellIndex, 1);
 dot.cellHoz = Math.floor(dot.X / CellWidth);

 dot.cellVert = Math.floor(dot.Y / CellHeight);
 if (
  Cells[dot.cellHoz] == undefined ||
  Cells[dot.cellHoz][dot.cellVert] == undefined
 ) {
  dot.cellHoz = Cells.length - 1;
  dot.cellVert = Cells[0].length - 1;
 }

 dot.cellIndex = Cells[dot.cellHoz][dot.cellVert].push(dot) - 1;
}

function attractToBottom() {
 for (i = 0; i < startingDots.length; i++) {
  dot = startingDots[i];

  dot.Ymoment += speed / 10;

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
 var gradient = ctx.createRadialGradient(
  dot.X,
  dot.Y,
  Pixelscale / 2,
  dot.X,
  dot.Y,
  Pixelscale * 2
 );
 gradient.addColorStop(0, "blue");
 gradient.addColorStop(1, "rgba(0,0,0,0)");
 ctx.arc(dot.X, dot.Y, Pixelscale, 0, 2 * Math.PI);

 ctx.fillStyle = gradient;
 ctx.fill();
}
function draw0(dot) {
 ctx.fillStyle = dot.colour;
 ctx.fillRect(dot.X, dot.Y, Pixelscale, Pixelscale);
}

function CreateStopButton() {
 let btn = document.createElement("button");
 btn.innerHTML = "Pause/Play";
 btn.className = "button";
 Clicked = false;
 btn.onclick = function () {
  console.log(startingDots);
  if (run) {
   //startingDots.forEach(draw);
   run = false;
   Clicked = true;
   btn.style.backgroundColor = "red";
  }
  if (!run && !Clicked) {
   console.log(run, Clicked);
   run = true;
   WasRunning = true;
   btn.style.backgroundColor = "green";
  }
  Clicked = false;

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
 prevHoz = [];
 prevVert = [];

 ctx.fillStyle = "rgb(0, 0, 0)";
 ctx.fillRect(0, 0, canvas.width, canvas.height);
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
function CreateSlider2() {
 let slider = document.createElement("input");
 slider.innerHTML = "range";
 slider.type = "range";
 slider.value = "25";

 document.body.appendChild(slider);

 slider.oninput = function () {
  updatingspeed1 = 200 / this.value;
 };
}
