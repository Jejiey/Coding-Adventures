class dot {
	constructor(startingX,startingY){	
		this.X = startingX
		this.Y = startingY
		this.angle = 0
		this.savedMoves = new Array(100)
		this.savedMoves[0] = 1
		for(let i = 1; i<this.savedMoves.length; i++){
			this.savedMoves[i] = [startingX,startingY]
	
		}
		this.speed = MoveSpeed
	}
	}

var canvas = document.createElement('canvas');
CanvasMultiple = 0.2
CreateCanvas();
Pixelscale = 10
var Width = canvas.width / (Pixelscale ) ;
var Height = canvas.height / (Pixelscale);

var MoveSpeed = 10
var updatingspeed = 10

var run = true
var startingDots = new Array(10)


intilise()

wait()
CreateStopButton()

function intilise(){
	for(i = 0; i< startingDots.length; i++){
		startingDots[i] = new dot(100,100)
	}
}

function wait(){
setTimeout(function(){
	
	if(run){
		
	startingDots.forEach(DotMoving)
	
	wait();

	}
	}, window.updatingspeed);
}

function CreateStopButton(){
	let btn = document.createElement("button");
	btn.innerHTML = "Pause/Play";
	btn.className = "button";
	
	btn.onclick = function () {
	console.log(startingDots)
	if(run)
	  run = false;
	else
	  run = true;
	
	wait();
	};
	document.body.appendChild(btn);
	
}
function clearCanvas(){
	ctx.fillStyle = "black";
	//ctx.fillRect( 0 ,0, canvas.width,canvas.height);	
}
function draw(toDraw){


	ctx.fillStyle = 'hsl( 173,58%,50%)';
	
	ctx.fillRect( toDraw.X ,toDraw.Y,Pixelscale,Pixelscale);


	Pdots = toDraw.savedMoves
	for(i = 1; i<Pdots.length; i++){
		
		ctx.fillStyle = 'hsl( 173,58%,'+ GetColour(Pdots)  +'%)';

		ctx.fillRect( Pdots[i][0] ,Pdots[i][1],Pixelscale,Pixelscale);

	}


}
function GetColour(Dots){
	if(Dots[0] - i >= 0 )
	colour = Dots.length - (Dots[0] - i)
	else
	colour =  Dots.length - (Dots.length - Math.abs(Dots[0] - i) )
		
	return (colour/Dots.length * 100)
}
function saveMoves(dot){
	
	dot.savedMoves[0] ++
	
	if(dot.savedMoves[0] >= dot.savedMoves.length ){
		dot.savedMoves[0] = 1
	}
	dot.savedMoves[dot.savedMoves[0]] = [dot.X, dot.Y]
}


function GetAngle(dot){
	angle = dot.angle
/*
	XInFront = Math.floor(dot.X + (GetDirection(dot.angle)[0])*1) | 0
	YInFront = Math.floor(dot.Y + (GetDirection(dot.angle)[1])*1) | 0

	ctx.fillStyle = 'red'
	

	colourInfront = ctx.getImageData(XInFront , YInFront, 1, 1).data
	*/
	angle = dot.angle + (10*(0.5 - Math.random())/6.28 )


	return angle
}

function DotMoving(dot){
	
	dot.angle = GetAngle(dot)
	dot.X += GetDirection(dot)[0] 
	dot.Y += GetDirection(dot)[1]	

	if(dot.X < 0 || dot.X > canvas.width || dot.Y < 0 || dot.Y > canvas.height ){
	dot.angle += 3.14
	dot.X += GetDirection(dot)[0] 
	dot.Y += GetDirection(dot)[1] 
	}
	saveMoves(dot)
	clearCanvas()
	draw(dot)
}
function GetDirection(dot){
	let XY = new Array(2)
	XY[0] = Math.floor(Math.sin(dot.angle) * dot.speed)
	XY[1] = Math.floor(Math.cos(dot.angle) *  dot.speed)
	

	return XY
}


function CreateCanvas(){


	CanvasMultiple ;
	
	canvas.id = "CursorLayer";
	canvas.width = 4000*CanvasMultiple;
	canvas.height = 2000*CanvasMultiple;
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