StyliseButtons()
CreateStopButton()
var canvas = document.createElement('canvas');

CanvasMultiple = 4;

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
multiple = 400;

extra = 0;


//starting location of point
Xx = 70*multiple;
Xy = 100*multiple;

//size of each point
scale = 3;

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
// location of corners (x,y)

ax = xcoord(0) ;
ay =  ycoord(0) ;

bx = xcoord(0) ;
by = ycoord(7) ;

cx = xcoord(1);
cy = ycoord(7) ;

dx = xcoord(1) ;
dy = ycoord(1) ;

ex = xcoord(4);
ey = ycoord(1) ;

fx = xcoord(4);
fy = ycoord(0);

Nbx = bx;
Nby = by;
window.updatingspeed =  0.01;

times = 0
ctx.fillStyle = 'hsl('+(260 ) +',90%,50%)';

for (var j = 0; j <10000100; j++) {

 Placing()
}
function Placing(){
Place(times)
times++



}

function CreateStopButton(){
let btn = document.createElement("button");
btn.innerHTML = "Pause/Play";
btn.className = "button";

btn.onclick = function () {

wait()

};
document.body.appendChild(btn);

}


function Place(i){
// repeates placing points




// decides which corner to move to
rnd =  Math.floor(Math.random() *6);
switch(rnd){
    case 1:

     savedX = (savedX + ax * (pointDiff -Diff ) )/pointDiff;
     savedY = (savedY + ay * (pointDiff -Diff ) )/pointDiff;
     prev = "ax";

    break;

 case 2:
    if(prev !=  'ex' && prev !='fx' ){

     savedX = (savedX + cx * (pointDiff -Diff ) )/pointDiff;
     savedY = (savedY + cy * (pointDiff -Diff ) )/pointDiff;
     prev = "cx";
}

break;

 case 3:

     savedX = (savedX + dx * (pointDiff -Diff ) )/pointDiff;
     savedY = (savedY + dy * (pointDiff -Diff ) )/pointDiff;
     prev = "dx";
     
break;

case 4:
    if(prev !=  'bx' && prev !=  'cx' ){
     savedX = (savedX + ex * (pointDiff -Diff ) )/pointDiff;
     savedY = (savedY + ey * (pointDiff -Diff ) )/pointDiff;
     prev = "ex";
     }

break;

case 5:
    if(prev !=  'bx' && prev !='cx'  ){
     savedX = (savedX + fx * (pointDiff -Diff ) )/pointDiff;
     savedY = (savedY + fy* (pointDiff -Diff ) )/pointDiff;
     prev = "fx";
     }
break;

    default:
    if(prev !=  'ex' &&prev != 'fx' ){
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



function xcoord(x,y){
return (x+0.2) * multiple

}
function ycoord(y){
return canvas.height - (y+0.2) * multiple

}
function StyliseButtons(){

  var styles =
`.button {
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


}`

var styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)


}

function wait() {




setTimeout(function(){


Placing();

wait();


}, window.updatingspeed);
}