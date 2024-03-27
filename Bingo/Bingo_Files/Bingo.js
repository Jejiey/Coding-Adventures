
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;


    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function tableCreate() {
  const body = document.body,
        tbl = document.createElement('table');
  sizing = 4;
  borders = '3px solid black';
  onClickColour = 'rgb(0, 255, 0)';

  tbl.style.width = window.innerWidth/1.1 +'px';
  tbl.style.height =  window.innerHeight/1.1 +'px';
  tbl.style.border = borders;
  tbl.style.textAlign = 'center';
  tbl.style.tableLayout ="fixed";
  tbl.style.fontSize  = "initial";
  tbl.style.overflow = 'hidden';
 tbl.style.textOverflow= 'ellipsis';
  tbl.style.whiteSpace='normal';
  tbl.style.backgroundColor = 'rgb(255,255,255)'

  const elements = [
  'Annoyed at Teachers',
  ' Well save this for later',
  'lessons starts 20 min in',
  'The greatest piece of software ever written',
  ' "You dont need to take this down but be aware"',
  'Lock himself in and marks assessment',
  'Coffee',
  'Aircon',
  'Random whistling',
  'Long, loosely related tangent',
  'Expletive',
  'Rabbits',
  'LSC (Lexicon, Syntax Compilation) LSD no thanks',
  '"Wait here"',
  '"Technology teacher"',
  'Not doing SDD in Project Period',
  'Adventure outside of 166',
  'Goykie arrives late',
  '"Classic Davis"',
  'Goykie lore',
  '"Sequence, selection iteration or repetition"',
  'Spontaneous tech support',
  'Political references / judgements',
  'Hallway antics',
  'Early mark',
  'Mr Forsyth comes in',
  'Gets call from family memeber',
  'Berating Davis',
  'Random teacher comes in (not Forsyth)',
  'Problem definition = what the algorithm does',
  'Max computer trouble',
  'Project Period',
  'Mitch lore',
  '"Mother father"',
  'SDD lore',
  '"Which dot point?"',
  'Joke that lands late',
  'Kidnap/harass small child/runners',
  'Loses it (in a funny way)',
  'Goykie vanishing',
  '12:14 alarm',
  '*person comes in late* "Oh sorry I didnt see you, let me adjust the roll"'];
  shuffle(elements);
  num = 0;


  for (let Height = 0; Height < 5; Height++) {
    const tr = tbl.insertRow();

    for (let Width = 0; Width < 5; Width++) {

           num++;
        const td = tr.insertCell();

if(Width !=2 || Height !=2){
         td.appendChild(document.createTextNode(elements[num]));
          }
       else
{
    td.appendChild(document.createTextNode("FIRST IN OUR HEARTS"));
}

         td.style.border = borders;

         td.style.tableLayout = "fixed";

    }

  }

  body.appendChild(tbl);


  if(tbl) tbl.onclick = function(e) {
    var target = (e || window.event).target;

    if (target.tagName in {TD:1, TH:1})
    {

        if(target.style.backgroundColor != onClickColour )
        {
                     target.style.backgroundColor = onClickColour;
                      target.style.border = borders;
                      CheckBingo(tbl);
        }
        else
        {
                      target.setAttribute('style', 'background-color: #FFF');
                       target.style.border = borders;
        }

        }

        };
    }

tableCreate();


function CheckBingo(tbl){

if(CheckRow(tbl) || CheckColumn(tbl) || CheckDiagonal(tbl) ){
tbl.remove();


var div = document.createElement("div");
div.setAttribute('style', 'font-size: 1000%; width: 100%; text-align: center;  margin: 0; position: absolute; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%); font-weight: bold; color: #3B3;');
document.body.appendChild(div);



const bingotxt = document.createTextNode("BINGO!!!!");
div.appendChild(bingotxt);

CreateBreak();

}
}

function CheckRow(tbl){

for(let row = 0; row < 5; row++){

var Count = 0;

for(let column = 0; column < 5; column++){

if(tbl.rows[row].cells[column].style.backgroundColor == 'rgb(0, 255, 0)'){

Count+=1;

}
if(Count==5){
return true;

}

tbl.rows[row].cells[column].style.border = borders;
}

}


}

function CheckColumn(tbl){

for(let column = 0; column < 5; column++){

var Count = 0;

for(let row = 0; row < 5; row++){

if(tbl.rows[row].cells[column].style.backgroundColor == 'rgb(0, 255, 0)'){

Count+=1;

}
if(Count==5){
return true;

}

tbl.rows[row].cells[column].style.border = borders;
}

}

}

function CheckDiagonal(tbl){

var PosCount = 0;
var NegCount = 0

for(let Pdiagonal = 0; Pdiagonal < 5; Pdiagonal++){

if(tbl.rows[Pdiagonal].cells[Pdiagonal].style.backgroundColor  == 'rgb(0, 255, 0)'){
PosCount+=1;
}
if(PosCount == 5){
return true;
}
}


for(let Ndiagonal = 4; Ndiagonal > -1; Ndiagonal--){
if(tbl.rows[4- Ndiagonal].cells[Ndiagonal].style.backgroundColor  == 'rgb(0, 255, 0)'){
NegCount+=1;
}
if(NegCount == 5){
return true;
}
}



}

function CreateBreak(){

var body = document.getElementsByTagName("body")[0];

body.appendChild(document.createElement("br"));
}



