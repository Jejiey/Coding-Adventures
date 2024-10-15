var canvas = document.createElement("canvas");

var Scale = 0.2;

StyliseButtons();

CreateCanvas();

var multiplier = 10;

var Width = canvas.width / multiplier;
var Height = canvas.height / multiplier;

CreateText();

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
