export class table {
  constructor(numberOfSeats, TableX, TableY, seatSize) {
    this.seatNum = numberOfSeats;
    this.width = (seatSize * 2 * this.seatNum) / 2;
    this.height = seatSize * 3;
    this.x = TableX - this.width / 2;
    this.y = TableY - this.height / 2;
    this.seatSize = seatSize;
    this.seating = this.createSeats();
  }

  displayTable(display_context) {
    display_context.fillStyle = "brown";
    display_context.fillRect(this.x, this.y, this.width, this.height);
    this.seating.forEach((element) => element.drawSeat(display_context));
  }

  createSeats() {
    let seats = new Array(this.seatNum);
    for (let i = 0; i < this.seatNum; i++) {
      let side = this.getSide(i);
      let position = i - (side * this.seatNum) / 2;
      seats[i] = new seat(position, side, this, this.seatSize);
    }
    return seats;
  }

  getSide(index) {
    if (index < this.seatNum / 2) {
      return 0;
    } else {
      return 1;
    }
  }
}

class seat {
  constructor(position, side, parentTable, seatSize) {
    this.position = position;
    this.side = side;
    this.name = "";
    this.age = 0;
    this.table = parentTable;
    this.seatSize = seatSize;
    this.getXY();
  }

  updateName(newName) {
    this.name = newName;
  }

  updateAge(newAge) {
    this.age = newAge;
  }

  getXY() {
    let parentTable = this.table;
    let seatSize = this.seatSize;
    this.x = seatSize / 2 + parentTable.x + this.position * seatSize * 2;
    this.y =
      parentTable.y - seatSize + this.side * (parentTable.height + seatSize);
  }

  drawSeat(display_context) {
    display_context.fillStyle = "blue";

    display_context.fillRect(this.x, this.y, this.seatSize, this.seatSize);

    display_context.fillStyle = "black";
    display_context.font =
      ((this.seatSize * 1.5) / this.name.length ** 0.9) * 1.1 + "px Arial";

    display_context.fillText(this.name, this.x, this.y + this.seatSize / 1.5);
  }

  checkMouse(mouseX, mouseY) {
    if (mouseX > this.x && mouseX < this.x + this.seatSize) {
      if (mouseY > this.y && mouseY < this.y + this.seatSize) {
        return true;
      }
    }
    return false;
  }
}
