var canvas = document.createElement('canvas');

CanvasMultiple = 2;

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
        ctx.lineWidth = this.gen/line1.gen*4;
        ctx.strokeStyle = colour;
        ctx.beginPath();
        ctx.moveTo(...this.start);
        ctx.lineTo(...this.end);
        ctx.stroke();
    }

    createChildren(locX,locY,size,numchildren){
        if(this.gen > 0){
        for(let j=0; j<numchildren;j++){
            let newAngle= (90+this.angle*180/Math.PI-(180/numchildren)*(j+0.5)) //standard
          //  newAngle= (this.angle*180/Math.PI +j*180) //non-standard
            let lineI = new line(locX,locY,newAngle,size)
            lineI.gen = this.gen -1
            let color = "hsl("+lineI.gen*30+",60%,60%)"
            lineI.draw(color)
            
            if(lineI.gen > 0){
                lineI.createChildren(...lineI.end, lineI.length/currentDivisor,numchildren)
            }
               

            
        }
    }

    }


}
run = false

let line1 = new line(width/2,height-60,-90,width/4)

currentDivisor = 1.5
numdivisions = 4
line1.gen = 8;
scriptName = document.currentScript.src.split(/[/.]/)[5]
console.log(scriptName)
drawnew()
function drawnew(){
   
ctx.fillRect(0,0,width,height)
line1.draw("hsl("+line1.gen*30+",60%,60%)")
line1.createChildren(...line1.end,line1.length/currentDivisor,  numdivisions)
if(numdivisions<5 && run){
    numdivisions +=1
    setTimeout(drawnew, 100)
}
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