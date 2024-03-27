var canvas = document.createElement('canvas');

CanvasMultiple = 6.7;

canvas.id = "CursorLayer";
canvas.width = 1224*CanvasMultiple;
canvas.height = 768*CanvasMultiple;
canvas.style.zIndex = 8;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";


var body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);

cursorLayer = document.getElementById("CursorLayer");

var ctx = canvas.getContext("2d");


// spacing of corners
multiple = 5;

extra = 0;


//starting location of point
Xx = 70*multiple;
Xy = 100*multiple;

//size of each point
scale = 2;

//location of point
savedX = Xx
savedY = Xy

// rounding for B corner
B_rounding = 0
round = false
angle = 0.1;


prev = "on"

pointDiff = 2;  // default 2
Diff = 1;       // default 1
change = 0;   // how pointDiff changes each round

for(let k = 0; k<1; k++){
var i = 0;
// location of corners (x,y)
ax = 10*multiple + extra;
ay = 210*multiple + extra;

bx = 410*multiple + extra;
by = 210*multiple + extra;

cx = 110*multiple + extra;
cy = (210-(1.73*200)/2)*multiple + extra;

dx = 310*multiple + extra;
dy = (210-(1.73*200)/2)*multiple + extra;

ex = 110*multiple + extra;
ey = (210+(1.73*200)/2)*multiple + extra;

fx = 310*multiple + extra;
fy = (210+(1.73*200)/2)*multiple + extra;

Nbx = bx;
Nby = by;


    //picks a random wieghted colour
ctx.fillStyle = 'hsl('+(100*k ) +',100%,40%)';


// repeates placing points
for(let i = 0; i<1000000; i++){


// decides which corner to move to
rnd =  Math.floor(Math.random() * 6);
switch(rnd){
    case 1:
    if(prev != 'ax'){
     savedX = (savedX + ax * (pointDiff -Diff ) )/pointDiff;
     savedY = (savedY + ay * (pointDiff -Diff ) )/pointDiff;
     prev = "ax";
}
    break;

 case 2:
    if(prev !=  'cx' ){

     savedX = (savedX + cx * (pointDiff -Diff ) )/pointDiff;
     savedY = (savedY + cy * (pointDiff -Diff ) )/pointDiff;
     prev = "cx";
}

break;

 case 3:
    if(prev != 'dx'){
     savedX = (savedX + dx * (pointDiff -Diff ) )/pointDiff;
     savedY = (savedY + dy * (pointDiff -Diff ) )/pointDiff;
     prev = "dx";
     }
break;

case 4:
    if(prev != 'ex'){
     savedX = (savedX + ex * (pointDiff -Diff ) )/pointDiff;
     savedY = (savedY + ey * (pointDiff -Diff ) )/pointDiff;
     prev = "ex";
     }
break;

case 5:
    if(prev != 'fx' ){
     savedX = (savedX + fx * (pointDiff -Diff ) )/pointDiff;
     savedY = (savedY + fy* (pointDiff -Diff ) )/pointDiff;
     prev = "fx";
     }
break;

    default:
    if(prev != 'bx' ){
     savedX = (savedX + bx * (pointDiff -Diff ) )/pointDiff;
     savedY = (savedY + by * (pointDiff -Diff ) )/pointDiff;
      prev = "bx";
}
}

 //deletes the first 16 points
    if(i>16){
   //rotates B around a point every ____ times
    var multiplet = String(i).slice(-3);
       if( multiplet == '000' && round == true){
        var newloc = rotate(-(bx+B_rounding),(by-B_rounding),Nbx,Nby,angle);
        Nbx = newloc[0];
        Nby = newloc[1];
        }
      // for troubleshooting to check rotation of B
      //  ctx.fillRect(Nbx, Nby, 100, 100);

      // creates each point
        ctx.fillRect(savedX, savedY, scale, scale);
    }

}

pointDiff = pointDiff + 0.2;
change = change + 0.2;
extra = extra + 20;

}
// the rotation function
            // center (x,y) point to be rotated (x,y) angle of rotation
function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) - (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) + (sin * (x + cx)) + cy;
        console.log(cursorLayer);
    return [nx,ny];

}





