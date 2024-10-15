var canvas = document.createElement("canvas");

var Scale = 0.5;

StyliseButtons();

CreateSlider();
CreateStopButton();
CreateRestartButton();
CreateText();
CreateBreak();
CreateCanvas();

MouseMovement();

var multiplier = 10;

var Width = canvas.width / multiplier;
var Height = canvas.height / multiplier;
var Pixels = new Array(Width * Height);
var NextPixels = new Array(Width * Height);

var x = null;
var y = null;

var prev = 0;
var next = 1;

var run = false;

var speed = 200;

window.updatingspeed = speed * ((1 + 100) / 100);

window.testblue = 1;

startup();
wait();

function Rules(BlueSpots, OrangeSpots, Blue, Orange, Black, NextPixels, i) {
  if (BlueSpots == 2 || (BlueSpots == 3 && Blue)) NextPixels[i][2] = 0;
  else if (BlueSpots == 4 || OrangeSpots == 4) NextPixels[i][2] = 2;
  else if (OrangeSpots == 2 || (OrangeSpots == 3 && Orange))
    NextPixels[i][2] = 1; //Pick([1,2])
  else NextPixels[i][2] = 1;

  return NextPixels[i][2];
}

function startup() {
  for (var i = 0; i < Pixels.length; i++) {
    Pixels[i] = new Array(3);
    NextPixels[i] = new Array(3);
  }

  for (var i = 0; i < Pixels.length; i++) {
    Pixels[i][0] = (i % Width) * multiplier;
    Pixels[i][1] = (Math.ceil((i + 1) / Width) - 1) * multiplier;

    if (
      Pixels[i][0] >= 1200 &&
      Pixels[i][0] <= 1800 &&
      Pixels[i][1] > 400 &&
      Pixels[i][1] < 1000 //   Pixels[i][2] = 1+ Math.floor(Math.random()*2);                                                      //uncomment for chaos
    );
    else Pixels[i][2] = 0;

    NextPixels[i][0] = Pixels[i][0];
    NextPixels[i][1] = Pixels[i][1];
    NextPixels[i][2] = Pixels[i][2];
  }

  Pixels.forEach(draw);
}

function wait() {
  setTimeout(function () {
    if (run) {
      dostuff();

      wait();
    }
  }, window.updatingspeed);
}

function dostuff() {
  for (var i = 0; i < Pixels.length; i++) {
    if (i > 0) var prev = i - 1;

    if (i < Pixels.length - 1) var next = i + 1;

    if (Pixels[i][1] != 0) var up = i - Width;

    if (Pixels[i][1] != Height * multiplier - multiplier) var down = i + Width;

    let OrangeSpots = OrangeSpotting(i, prev, next, up, down);

    let BlueSpots = BlueSpotting(i, prev, next, up, down);

    Blue = Pixels[i][2] == 2;
    Orange = Pixels[i][2] == 1;
    Black = Pixels[i][2] == 0;

    NextPixels[i][2] = Rules(
      BlueSpots,
      OrangeSpots,
      Blue,
      Orange,
      Black,
      NextPixels,
      i
    );
  }
  // Pixels = Next Pixels
  ApplyPix();

  Pixels.forEach(draw);
}

function StyliseButtons() {
  var styles = `.button {
background-color: #4CAF50;
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

function CreateBreak() {
  var body = document.getElementsByTagName("body")[0];

  body.appendChild(document.createElement("br"));
}

function CreateCanvas() {
  CanvasMultiple = Scale;

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

function CreateStopButton() {
  let btn = document.createElement("button");
  btn.innerHTML = "Pause/Play";
  btn.className = "button";

  btn.onclick = function () {
    if (run) run = false;
    else run = true;

    wait();
  };
  document.body.appendChild(btn);
}

function CreateRestartButton() {
  let btn = document.createElement("button");
  btn.innerHTML = "Restart";
  btn.className = "button";

  btn.onclick = function () {
    CreateCanvas();

    NextPixels.forEach(Reset);

    ApplyPix();
  };
  document.body.appendChild(btn);
}

function CreateSlider() {
  let slider = document.createElement("input");
  slider.innerHTML = "range";
  slider.type = "range";
  slider.value = "100";

  document.body.appendChild(slider);

  slider.oninput = function () {
    window.updatingspeed = (this.value / 100) * speed;
  };
}

function CreateText() {
  Label("Code: ");
  let typed = CreateInput("text");

  document.body.appendChild(typed);

  typed.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
      window.testblue = typed.value;
      typed.value = "";
    }
  });
}

function Label(Text) {
  let label = document.createElement("label");
  label.innerText = label;
  label.innerText = Text;
  document.body.appendChild(label);
}

function CreateInput(type) {
  CreatedElement = document.createElement("input");
  CreatedElement.innerHTML = type;
  CreatedElement.type = type;
  return CreatedElement;
}

function MouseMovement() {
  var mouseDown = 0;
  document.onmousemove = handleMouseMove;
  function handleMouseMove(event) {
    document.body.onmousedown = function () {
      ++mouseDown;
    };
    document.body.onmouseup = function () {
      --mouseDown;
    };

    if (mouseDown) {
      const getMousePos = (canvas, evt) => {
        const rect = canvas.getBoundingClientRect();

        // mouseX = ((event.clientX  - rect.left) / (rect.right - rect.left )) * (canvas.width);
        // mouseY = ((event.clientY - rect.top  ) / (rect.bottom - rect.top )) * (canvas.height);

        mouseX =
          ((event.clientX - rect.left) / (rect.right - rect.left)) *
          canvas.width;
        mouseY =
          ((event.clientY - rect.top) / (rect.bottom - rect.top)) *
          canvas.height;

        x = Math.round(mouseX / multiplier);
        y = Math.round(mouseY / multiplier);

        var xy = [x, y];

        return xy;
      };

      var MousedPixel = getMousePos(canvas, MouseEvent);

      var PixelLoc = Math.round(MousedPixel[0] + (MousedPixel[1] - 1) * Width);

      Pixels[PixelLoc][2] = 2;
      Pixels.forEach(draw);
    }
  }
}

function draw(coords) {
  if (coords[2] == 2) window.ctx.fillStyle = "hsl( 198,100%,50%)";

  if (coords[2] == 1) window.ctx.fillStyle = "hsl( 22,96%,50%)";

  if (coords[2] == 0) window.ctx.fillStyle = "hsl( 173,58%,0%)";

  window.ctx.fillRect(coords[0], coords[1], 9, 9);
}

function ApplyPix() {
  for (var i = 0; i < Pixels.length; i++) {
    Pixels[i][0] = NextPixels[i][0];
    Pixels[i][1] = NextPixels[i][1];
    Pixels[i][2] = NextPixels[i][2];
  }
}

function OrangeSpotting(i, prev, next, up, down) {
  //OrangeLeft
  if (Pixels[i][0] != 0) PrevTrue = Pixels[prev][2] == 1;
  else PrevTrue = true;

  //OrangeRight
  if (Pixels[i][0] != Width * multiplier - multiplier)
    NextTrue = Pixels[next][2] == 1;
  else NextTrue = true;

  //OrangeUp
  if (Pixels[i][1] != 0) UpTrue = Pixels[up][2] == 1;
  else UpTrue = true;

  //OrangeDown
  if (Pixels[i][1] != Height * multiplier - multiplier)
    DownTrue = Pixels[down][2] == 1;
  else DownTrue = true;

  OrangeSpots = 0;

  if (PrevTrue) OrangeSpots += 1;
  if (NextTrue) OrangeSpots += 1;
  if (UpTrue) OrangeSpots += 1;
  if (DownTrue) OrangeSpots += 1;

  return OrangeSpots;
}

function BlueSpotting(i, prev, next, up, down) {
  if (Pixels[i][0] != 0) PrevTrue = Pixels[prev][2] == 2;
  else PrevTrue = true;

  if (Pixels[i][0] != Width * multiplier - multiplier)
    NextTrue = Pixels[next][2] == 2;
  else NextTrue = true;

  if (Pixels[i][1] != 0) UpTrue = Pixels[up][2] == 2;
  else UpTrue = true;

  if (Pixels[i][1] != Height * multiplier - multiplier)
    DownTrue = Pixels[down][2] == 2;
  else DownTrue = true;

  BlueSpots = 0;

  if (PrevTrue) BlueSpots += 1;
  if (NextTrue) BlueSpots += 1;
  if (UpTrue) BlueSpots += 1;
  if (DownTrue) BlueSpots += 1;

  return BlueSpots;
}

function Reset(coords) {
  coords[2] = 0;
}

function Pick(InputArray) {
  let currentIndex = InputArray.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [InputArray[currentIndex], InputArray[randomIndex]] = [
      InputArray[randomIndex],
      InputArray[currentIndex],
    ];
  }

  return InputArray[0];
}
