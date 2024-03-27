function doStf() {
  d = new Date();
  startTime = d.getTime();
  console.log(startTime);
  var canvas = document.createElement("canvas");

  CanvasMultiple = 1;

  canvas.id = "CursorLayer";
  canvas.width = 1000 * CanvasMultiple;
  canvas.height = 1000 * CanvasMultiple;

  canvas.style.zIndex = 8;
  canvas.style.position = "absolute";
  canvas.style.border = "1px solid";

  var body = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);

  cursorLayer = document.getElementById("CursorLayer");

  var ctx = canvas.getContext("2d");

  var quality = 1; //lower = higher

  var XstartValue = 0.5;
  var XendValue = 0;

  var YstartValue = -0.5;
  var YendValue = 0;

  var mouseTries = 0;

  var reset = true; // Set to true to have normal

  if (reset) {
    XstartValue = -2;
    XendValue = 2;
    YstartValue = -2;
    YendValue = 2;
    quality = 0.001;
  }

  var XmiddleValue = (XendValue + XstartValue) / 2;
  var Xmultiplier = 1 / -(XendValue - XmiddleValue);
  var Xchange =
    ((XendValue - XstartValue) * (quality / CanvasMultiple / 2)) / 2;
  var pointX = 0;
  var prevPointX = 0;
  var X = XstartValue;

  var YmiddleValue = (YendValue + YstartValue) / 2;
  var Ymultiplier = 1 / -(YendValue - YmiddleValue);
  var Ychange =
    ((YendValue - YstartValue) * (quality / CanvasMultiple / 2)) / 1.9;
  var pointY = 0;
  var prevPointY = 0;
  var Y = YstartValue;

  var scale = quality * 1000;
  //ctx.translate(canvas.width / 2, canvas.height/2);

  var i = 0;
  ctx.beginPath();
  while (X < XendValue) {
    while (Y < YendValue) {
      while (i < 70) {
        pointX = prevPointX ** 2 - prevPointY ** 2 - X;
        pointY = 2 * prevPointX * prevPointY + Y;
        if (Math.sqrt(pointX ** 2 + pointY ** 2) > 5) {
          break;
        }
        prevPointX = pointX;
        prevPointY = pointY;
        i++;
      }
      if (complexDraw) {
        ctx.fillStyle = "hsl(" + 240 + ",100%," + i ** 2 + "%)";
        if (i ** 2 >= 100) {
          ctx.fillStyle = "hsl(" + 520 + ",100%," + (i * i) / 100 + "%)";
        }
        ctx.fillRect(
          Math.round(
            (((X - XmiddleValue) * Xmultiplier + 1) * canvas.width) / 2
          ),
          Math.round(
            (((Y - YmiddleValue) * Ymultiplier + 1) * canvas.height) / 2
          ),
          scale,
          scale
        );
      } else {
        if (i * 4 >= 100) {
          ctx.rect(
            Math.round(
              (((X - XmiddleValue) * Xmultiplier + 1) * canvas.width) / 2
            ),
            Math.round(
              (((Y - YmiddleValue) * Ymultiplier + 1) * canvas.height) / 2
            ),
            scale,
            scale
          );
        }
      }

      Y += Ychange;
      prevPointX = 0;
      prevPointY = 0;
      i = 0;
    }
    Y = YstartValue;
    X += Xchange;
  }
  ctx.fillStyle = "blue";
  ctx.fill();
  d = new Date();
  console.log(d.getTime() - startTime);
}
complexDraw = 0;

(function () {
  document.onmousemove = handleMouseMove;
  function handleMouseMove(event) {
    document.body.onclick = function () {
      doStf();
      complexDraw++;
      complexDraw = complexDraw % 2;
    };
  }
})();
