StyliseLabels();
StyliseButtons();
StyliseTextInputs();



books = [];
bookNum = 0;
window.BookTitle;
window.BookAuthor;
window.BookDate;
window.BookGenre;


CreateText('Title: ', 'BookTitle');
CreateText('Author: ', 'BookAuthor');
CreateText('Date: ', 'BookDate' );
CreateText('Genre: ', 'BookGenre' );

CreateAddButton();


class book {
  constructor(title, author, date, genre){

    this.title = title;
    this.author = author;
    this.date = date;
    this.genre = genre;
    }

}





function AddBook(Title,Author,Date,Genre){

    let bookToAdd = new book(Title, Author, Date, Genre);

  books.push( bookToAdd);

  books.forEach(PrintBooks);
  console.log('\n')
}



function StyliseButtons(){

  var styles =
`.button {
background-color: #4CAF50;
border: none;
color: white;
position: absolute;

transform: translateX(25%);
padding: 15px 32px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 250%;
margin: 3px 10px;
cursor: pointer;
height: 10%;
width: 60%;
font-family: 'Copperplate';

}`

var styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)


}

function StyliseTextInputs(){

  var styles =
`input[type=text] {

  width: 50%;
  padding: 12px 20px;
  margin: 8px 40px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 150%;
  font-family: 'Copperplate';

}`

var styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)


}

function StyliseLabels(){

  var styles =
`label {
  margin: 300px 50px;
  color: black;
  padding: 8px;
  font-size: 250%;
  font-family: 'Copperplate';
}`

var styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)


}




function CreateAddButton(){
let btn = document.createElement("button");
btn.innerHTML = "Add to library";
btn.className = "button";

btn.onclick = function () {

    AddBook(window.BookTitle, window.BookAuthor, window.BookDate, window.BookGenre);



};
document.body.appendChild(btn);

}

function CreateText(label, BookDet){

CreateLabel(label);
CreateBreak();
let typed = CreateInput('text');


document.body.appendChild(typed);
CreateBreak();

typed.addEventListener("keyup", ({key}) => {

    window[BookDet] =  typed.value;

})
}

function CreateBreak(){

var body = document.getElementsByTagName("body")[0];

body.appendChild(document.createElement("br"));
}

function CreateInput(type){
	CreatedElement = document.createElement('input')
	CreatedElement.innerHTML = type;
	CreatedElement.type = type;
	return CreatedElement;
}

function CreateLabel(Text){

let label = document.createElement('label');
label.innerText = label;
label.innerText = Text;
document.body.appendChild(label);


}

function PrintBooks(currentValue,index){

    console.log( index + ' Title: ' + books[index].title);
    console.log( index + ' Author: ' + books[index].author);
    console.log( index + ' Date: ' + books[index].date);
    console.log( index + ' Genre: ' + books[index].genre);



}