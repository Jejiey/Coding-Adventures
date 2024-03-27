
SCALING = 10;
CANVAS_SIZE = 10;

class vector {
    constructor(x,y,ctx){
        this.x =x*SCALING;
        this.y =y*SCALING;
    
      this.x = (this.x/SCALING)**2 - (this.y/SCALING)**2 ;
      this.y = (this.y/SCALING)*(this.x/SCALING)*2 ;
  
        ctx.fillStyle = "blue";
        ctx.rect(this.x,this.y,1,1);
        ctx.fill();
    }
}

function paint(ctx,pixels, t){

    c = new vector(0,0);

    for(i =0; i<CANVAS_SIZE*CANVAS_SIZE*2; i++){
        pixels[i].cmplxSqr(c);
         pixels[i].paint(ctx);
    }
}
function create_canvas(){
var canvas = document.createElement('canvas');



canvas.id = "CursorLayer";
canvas.width = SCALING*CANVAS_SIZE*2;
canvas.height = SCALING*CANVAS_SIZE;
canvas.style.zIndex = 8;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";


var body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);

cursorLayer = document.getElementById("CursorLayer");


return canvas.getContext("2d");
}
ctx = create_canvas(CANVAS_SIZE);
pixels = new Array(CANVAS_SIZE*CANVAS_SIZE*2);
count =0;
for(i =0; i<CANVAS_SIZE*2; i++){
    for(j=0;j<CANVAS_SIZE;j++){
        pixels[count] = new vector(i,j,ctx);
        count++;
    }
}


