/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { router } from "https://crux.land/router@0.0.11";
import { h, ssr } from "https://crux.land/nanossr@0.0.4";

const render = (component) => ssr(() => <App>{component}</App>);

serve(
  router(
    {
      "/": () => render(<Landing />),
      "/stats": () => render(<Stats />),
      "/bagels": () => render(<Bagels />),
    },
    () => render(<NotFound />)
  )
);

canvas = document.createElement("canvas");

Scale = 0.5;

StyliseButtons();

CreateSlider();
CreateStopButton();
CreateRestartButton();
CreateText();
CreateBreak();
CreateCanvas();

MouseMovement();

multiplier = 10;

Width = canvas.width / multiplier;
Height = canvas.height / multiplier;
Pixels = new Array(Width * Height);
NextPixels = new Array(Width * Height);

x = null;
y = null;

prev = 0;
next = 1;

run = false;

speed = 200;

globalThis.updatingspeed = speed * ((1 + 100) / 100);

globalThis.testblue = 1;

startup();
wait();

function Rules(BlueSpots, OrangeSpots, Blue, Orange, NextPixels, i) {
  if (BlueSpots == 2 || (BlueSpots == 3 && Blue)) NextPixels[i][2] = 0;
  else if (BlueSpots == 4 || OrangeSpots == 4) NextPixels[i][2] = 2;
  else if (OrangeSpots == 2 || (OrangeSpots == 3 && Orange))
    NextPixels[i][2] = 1; //Pick([1,2])
  else NextPixels[i][2] = 1;

  return NextPixels[i][2];
}

export function startup() {
  for (i = 0; i < Pixels.length; i++) {
    Pixels[i] = new Array(3);
    NextPixels[i] = new Array(3);
  }

  for (i = 0; i < Pixels.length; i++) {
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

export function wait() {
  setTimeout(function () {
    if (run) {
      dostuff();

      wait();
    }
  }, globalThis.updatingspeed);
}

function dostuff() {
  for (i = 0; i < Pixels.length; i++) {
    if (i > 0) prev = i - 1;

    if (i < Pixels.length - 1) next = i + 1;

    if (Pixels[i][1] != 0) up = i - Width;

    if (Pixels[i][1] != Height * multiplier - multiplier) down = i + Width;

    const OrangeSpots = OrangeSpotting(i, prev, next, up, down);

    const BlueSpots = BlueSpotting(i, prev, next, up, down);

    Blue = Pixels[i][2] == 2;
    Orange = Pixels[i][2] == 1;

    NextPixels[i][2] = Rules(
      BlueSpots,
      OrangeSpots,
      Blue,
      Orange,
      NextPixels,
      i
    );
  }
  // Pixels = Next Pixels
  ApplyPix();

  Pixels.forEach(draw);
}

function StyliseButtons() {
  styles = `.button {
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

  styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

function CreateBreak() {
  body = document.getElementsByTagName("body")[0];

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

  body = document.getElementsByTagName("body")[0];

  body.appendChild(canvas);

  cursorLayer = document.getElementById("CursorLayer");

  globalThis.ctx = canvas.getContext("2d");

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function CreateStopButton() {
  const btn = document.createElement("button");
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
  const btn = document.createElement("button");
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
  const slider = document.createElement("input");
  slider.innerHTML = "range";
  slider.type = "range";
  slider.value = "100";

  document.body.appendChild(slider);

  slider.oninput = function () {
    globalThis.updatingspeed = (this.value / 100) * speed;
  };
}

function CreateText() {
  Label("Code: ");
  const typed = CreateInput("text");

  document.body.appendChild(typed);

  typed.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
      globalThis.testblue = typed.value;
      typed.value = "";
    }
  });
}

function Label(Text) {
  const label = document.createElement("label");
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
  mouseDown = 0;
  document.onmousemove = handleMouseMove;
  function handleMouseMove(event) {
    document.body.onmousedown = function () {
      ++mouseDown;
    };
    document.body.onmouseup = function () {
      --mouseDown;
    };

    if (mouseDown) {
      const getMousePos = (canvas) => {
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

        xy = [x, y];

        return xy;
      };

      MousedPixel = getMousePos(canvas, MouseEvent);

      PixelLoc = Math.round(MousedPixel[0] + (MousedPixel[1] - 1) * Width);

      Pixels[PixelLoc][2] = 2;
      Pixels.forEach(draw);
    }
  }
}

function draw(coords) {
  if (coords[2] == 2) globalThis.ctx.fillStyle = "hsl( 198,100%,50%)";

  if (coords[2] == 1) globalThis.ctx.fillStyle = "hsl( 22,96%,50%)";

  if (coords[2] == 0) globalThis.ctx.fillStyle = "hsl( 173,58%,0%)";

  globalThis.ctx.fillRect(coords[0], coords[1], 9, 9);
}

function ApplyPix() {
  for (i = 0; i < Pixels.length; i++) {
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

function _Pick(InputArray) {
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
