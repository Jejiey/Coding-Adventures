var canvas = document.createElement('canvas');

CanvasMultiple = 1;

canvas.id = "CursorLayer";
canvas.width = 1000*CanvasMultiple;
canvas.height = 1000*CanvasMultiple;
width = canvas.width;
height = canvas.height;
canvas.style.zIndex = 8;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";


var body = document.getElementsByTagName("body")[0];
CreateSaveButton()
CreateStopButton()
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
        for(let j=0; j<Math.floor(circleSize);j++){
    
            let lineI = new line(locX,locY,j*3.6*100/circleSize,size)
            let color = "red"
            lineI.draw(color)
            lineI.gen = this.gen -1
            if(lineI.gen > 0){
                lineI.createChildren(...lineI.end, lineI.length/currentDivisor)
            }
               

            
        }
    }

    }


}

currentDivisor = 4
scriptName = document.currentScript.src.split(/[/.]/)[5]

circleSize = 1;
run = true
let line1 = new line(0,0,0,0)
line1.gen = 3;
drawnew()
function drawnew(){
    line1.gen = Math.round((30-circleSize)/4);
ctx.fillRect(0,0,width,height)
line1.createChildren(width/2,width/2,width/4)
circleSize+=1
if(circleSize<30 && run)
setTimeout(drawnew, 100)
}



function CreateSaveButton() {
    // the button that saves the canvas as a image that downloads
    let btn = document.createElement("button");
    btn.innerHTML = "Save"; //the text displayed on the button
    btn.className = "button";
    btn.setAttribute("id", "button");
    btn.title = "Save screen as image"
    btn.onclick = function () {
        run = false
     var link = document.createElement("a"); //when this button clicked create a new element that leads to downloading the image
     link.download = scriptName+".png"; //download the image when clicked
     link.href = document.getElementById("CursorLayer").toDataURL(); //make the element clickable
     link.click(); //click the element
    };
    body.appendChild(btn); //append the button
   }
function CreateStopButton() {
    // the button that saves the canvas as a image that downloads
    let btn = document.createElement("button");
    btn.innerHTML = "Stop"; //the text displayed on the button
    btn.className = "button";
    btn.setAttribute("id", "button");
    btn.title = "Stop"
    btn.onclick = function () {
        run = false
    };
    body.appendChild(btn); //append the button
   }