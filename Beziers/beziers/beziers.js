CANVAS_SIZE = 1000;
BEZIER_DETAIL = 300;
WIDTH = 80;

class point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(otherPoint) {
    return new point(this.x + otherPoint.x, this.y + otherPoint.y);
  }
  subtract(otherPoint) {
    return new point(this.x - otherPoint.x, this.y - otherPoint.y);
  }
  multiply(multiple) {
    return new point(this.x * multiple, this.y * multiple);
  }
  draw(hue) {
    ctx.fillStyle = "hsl(" + hue + ",80%,60%)";
    ctx.fillRect(this.x, this.y, 2, 2);
  }
}

ctx = create_canvas(CANVAS_SIZE);

testPoint1 = new point(900, 500);
testPoint1.draw(0);
testPoint2 = new point(100, 500);
testPoint2.draw(0);

testmiddle = new point(600, 10);

rotateMiddle(testmiddle, 0, 0);

function rotateMiddle(middle, time, hue) {
  newMiddle = middle.add(
    new point(Math.cos(time) * WIDTH, Math.sin(time) * WIDTH)
  );

  doInterpolation(testPoint1, testPoint2, newMiddle, BEZIER_DETAIL, hue);
  if (newMiddle.y < 1000 * 1.5 && time < WIDTH) {
    setTimeout(function () {
      rotateMiddle(middle, time + 1, hue);
    }, 10);
  }
}

function LinearInterpolation(start, end, t) {
  return start.add(end.subtract(start).multiply(t));
}

function doInterpolation(start, end, middle, timeLeft, hue) {
  startMiddle = LinearInterpolation(start, middle, timeLeft / BEZIER_DETAIL);
  endMiddle = LinearInterpolation(middle, end, timeLeft / BEZIER_DETAIL);
  middleMiddle = LinearInterpolation(
    startMiddle,
    endMiddle,
    timeLeft / BEZIER_DETAIL
  );

  middleMiddle.draw(hue);
  timeLeft--;
  if (timeLeft > 0) {
    //setTimeout(function () {
    doInterpolation(start, end, middle, timeLeft, hue);
    // }, 0);
  }
}

document.addEventListener("mousedown", function (event) {
  let x = event.clientX;
  let y = event.clientY;
  cursormiddle = new point(x, y);
  rotateMiddle(cursormiddle, 0, Math.random() * 360);
});

function create_canvas() {
  var canvas = document.createElement("canvas");

  canvas.id = "CursorLayer";
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  canvas.style.zIndex = 8;
  canvas.style.border = "1px solid";

  var body = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);

  cursorLayer = document.getElementById("CursorLayer");

  return canvas.getContext("2d");
}
