import { table } from "./tableMaker.js";
const scale = 100;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 2000;
canvas.height = 1500;
const canvasLeft = canvas.offsetLeft + canvas.clientLeft;
const canvasTop = canvas.offsetTop + canvas.clientTop;
var ageChange = false;

let basicTable = new table(10, canvas.width / 2, canvas.height / 2, scale);
randomiseNames(basicTable);
updateScreen();

function randomiseNames(table) {
  table.seating.forEach((seat) => {
    let randomName = "";
    while (Math.random() > 0.3) {
      randomName = randomName.concat(
        String.fromCharCode(97 + Math.floor(Math.random() * 24))
      );
    }
    seat.updateName(randomName);
  });
}

canvas.addEventListener("click", handleClicks, false);

function handleClicks(event) {
  basicTable.seating.forEach((seat) => {
    let canvasMouseX = event.pageX - canvasLeft;
    let canvasMouseY = event.pageY - canvasTop;
    if (seat.checkMouse(canvasMouseX, canvasMouseY)) {
      if (!ageChange) {
        changeName(seat);
      } else {
        changeAge(seat);
      }
    }
  });
}

function changeName(seat) {
  let newName = prompt("Enter name: ");
  if (newName != null) {
    seat.updateName(newName);
  }
  updateScreen();
}

function changeAge(seat) {
  let newAge = prompt("Enter name: ");
  seat.updateAge(newAge);
  updateScreen();
}

function updateScreen() {
  ctx.fillStyle = "green";
  ctx.fillRect(20, 10, canvas.width, canvas.height);
  basicTable.displayTable(ctx);
}
