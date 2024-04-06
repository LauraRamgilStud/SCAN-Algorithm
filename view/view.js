export function createFloors(numFloors) {
  const building = document.getElementById("building");
  for (let i = 12; i >= -1; i--) {
    const floor = document.createElement("div");
    const floorNum = document.createElement("p");
    floor.classList.add("floor");
    floorNum.classList.add("floor-num");

    // Create a text node with the floor number
    const textNode = document.createTextNode(i >= 0 ? "Floor: " + i : "B");

    // Append the text node to the floor div
    floorNum.appendChild(textNode);
    floor.appendChild(floorNum);

    // Append the floor div to the building
    building.appendChild(floor);
  }
}

export function moveElevator(floorArray, callback) {
  const elevator = document.getElementById("elevator");
  const elevatorSyles = window.getComputedStyle(elevator);
  const bottomValue = elevatorSyles.getPropertyValue("bottom");
  const floorHeight = 45;
  let currentFloor = parseInt(bottomValue, 10);

  function moveToFloor(index) {
    let targetFloor = (floorArray[index] + 1) * floorHeight;
    let id = setInterval(frame, 10);

    function frame() {
      if (currentFloor === targetFloor) {
        clearInterval(id);
        setTimeout(() => {
          if (index < floorArray.length - 1) {
            moveToFloor(index + 1);
          } else {
            callback();
            console.log("Elevator reached all floors");
          }
        }, 1000); // Pause for 1 second
      } else {
        if (targetFloor < currentFloor) {
          currentFloor--;
          elevator.style.bottom = currentFloor + "px";
        } else {
          currentFloor++;
          elevator.style.bottom = currentFloor + "px";
        }
      }
    }
  }

  // Start the movement with the first floor in the array
  if (floorArray.length > 0) {
    moveToFloor(0);
  } else {
    console.log("No floors specified");
  }
}
