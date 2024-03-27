var canvas = document.createElement('canvas');

CanvasMultiple = 4;

canvas.id = "CursorLayer";
canvas.width = 1000*CanvasMultiple;
canvas.height = 1000*CanvasMultiple;
width = canvas.width;
height = canvas.height;
canvas.style.zIndex = 8;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";


var body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);

cursorLayer = document.getElementById("CursorLayer");

var ctx = canvas.getContext("2d");

class line {
    
    constructor(x,y,angle,length){
        this.dotted = false;
        this.start = [x,y];
        this.angle = angle*Math.PI/180;
        this.length = length;
        let endX = this.start[0] + Math.cos(this.angle)*this.length;
        let endY = this.start[1] + Math.sin(this.angle)*this.length;
        this.end = [endX,endY];
        this.gen;

    }
    dot(scale){
        this.dotted=true
        ctx.strokeStyle = "black";
       
        ctx.beginPath();
        ctx.ellipse(this.end[0]-scale/2,this.end[1]-scale/2 , scale,scale,0,0,2*Math.PI);
        ctx.fill();
    }
    draw(colour){
        ctx = canvas.getContext("2d");
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = colour;
        ctx.beginPath();
        ctx.moveTo(...this.start);
        ctx.lineTo(...this.end);
        ctx.stroke();
    }

    createChildren(locX,locY,size){
        if(this.gen > 0){
        for(let j=0; j<Math.floor(100/circleSize);j++){
    
            let lineI = new line(locX,locY,j*3.6*circleSize,size)
            let color = "hsla("+j*10+",60%,60%,.1)"
           if(this.gen!=2) lineI.draw(color)
            lineI.gen = this.gen -1
            if(lineI.gen > 0){
                lineI.createChildren(...lineI.end, lineI.length/currentDivisor)
            }
               

            
        }
    }

    }


}
scriptName = document.currentScript.src.split(/[/.]/)[5]

currentDivisor = 100

circleSize = 0.5;

let line1 = new line(0,0,0,0)
line1.gen = 2;
growing()
function growing(){
    ctx.fillRect(0,0,width,height)
    line1.createChildren(width/2,width/2,width/4)
    currentDivisor -= currentDivisor*0.1
    if(currentDivisor>0.1)
    setTimeout(growing, 10)
else {
    console.log("stopped")
}

}




