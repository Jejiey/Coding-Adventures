class tile {
  constructor(TileX, TileY) {
    this.size = canvas.width / 14;
    this.X = TileX * this.size * 1.1 + this.size / 2 + canvas.width / 10;
    this.Y = TileY * this.size * 1.1 + this.size / 2 + canvas.height / 10;
    this.r = 0;
  }
  shift(x, y) {
    this.X += x;
    this.Y += y;
  }
  rotate(r) {
    this.r = r;
    this.draw();
  }
  draw() {
    ctx.translate(this.X, this.Y);
    ctx.rotate(this.r);
    ctx.translate(-this.X, -this.Y);

    ctx.fillStyle = "red";
    ctx.fillRect(
      this.X - this.size / 2,
      this.Y - this.size / 2,
      this.size,
      this.size
    );
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

var canvas = document.createElement("canvas");
CanvasMultiple = 0.2;
CreateCanvas();
var bigBoard = intiTiles();

clear();
//LR
for (x = 4; x < 8; x++) {
  for (y = 4; y < 8; y++) {
    rotation = (Math.random() * Math.PI) / 4;
    bigBoard[x][y].rotate(rotation);

    shift = (Math.sin(rotation) * bigBoard[x][y].size) / 2;
    for (shiftedX = x; shiftedX < 8; shiftedX++) {
      bigBoard[shiftedX][y].shift(shift, 0);
    }
    for (shiftedY = y; shiftedY < 8; shiftedY++) {
      bigBoard[x][shiftedY].shift(0, shift);
    }
  }
}
//LL
for (x = 3; x >= 0; x--) {
  for (y = 4; y < 8; y++) {
    rotation = (Math.random() * Math.PI) / 4;
    bigBoard[x][y].rotate(rotation);

    shift = (Math.sin(rotation) * bigBoard[x][y].size) / 2;
    for (shiftedX = x; shiftedX >= 0; shiftedX--) {
      bigBoard[shiftedX][y].shift(-shift, 0);
    }
    for (shiftedY = y; shiftedY < 8; shiftedY++) {
      bigBoard[x][shiftedY].shift(0, shift);
    }
  }
}
//UL
for (x = 3; x >= 0; x--) {
  for (y = 3; y >= 0; y--) {
    rotation = (Math.random() * Math.PI) / 4;
    bigBoard[x][y].rotate(rotation);

    shift = (Math.sin(rotation) * bigBoard[x][y].size) / 2;
    for (shiftedX = x; shiftedX >= 0; shiftedX--) {
      bigBoard[shiftedX][y].shift(-shift, 0);
    }
    for (shiftedY = y; shiftedY >= 0; shiftedY--) {
      bigBoard[x][shiftedY].shift(0, -shift);
    }
  }
}
//UR
for (x = 4; x < 8; x++) {
  for (y = 3; y >= 0; y--) {
    rotation = (Math.random() * Math.PI) / 4;
    bigBoard[x][y].rotate(rotation);

    shift = (Math.sin(rotation) * bigBoard[x][y].size) / 2;
    for (shiftedX = x; shiftedX < 8; shiftedX++) {
      bigBoard[shiftedX][y].shift(shift, 0);
    }
    for (shiftedY = y; shiftedY >= 0; shiftedY--) {
      bigBoard[x][shiftedY].shift(0, -shift);
    }
  }
}

function intiTiles() {
  var board = new Array(8);
  for (x = 0; x < 8; x++) {
    board[x] = new Array(8);
    for (y = 0; y < 8; y++) {
      board[x][y] = new tile(x, y);
      board[x][y].draw();
    }
  }
  return board;
}
function clear() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function CreateCanvas() {
  CanvasMultiple;

  canvas.id = "CursorLayer";
  canvas.width = 4500 * CanvasMultiple;
  canvas.height = 4500 * CanvasMultiple;
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
