import { SCAN } from "../model/model.js";
import { moveElevator, createFloors } from "../view/view.js";
let array = [];
let direction = "left";
createFloors(13);
const directionBtn = document.getElementById("direction");
const floorBtn = document.getElementById("floor-btns");

directionBtn.addEventListener("click", (e) => {
  direction = e.target.id;
  e.target.style.transform = "scale(1.2)";
});

floorBtn.addEventListener("click", (e) => {
  array.push(parseInt(e.target.innerText, 10));
  e.target.style.backgroundColor = "lightgray";
});

document.getElementById("start-btn").addEventListener("click", start);

function start() {
  const elevator = document.getElementById("elevator");
  const elevatorSyles = window.getComputedStyle(elevator);
  const bottomValue = elevatorSyles.getPropertyValue("bottom");
  const head = parseInt(bottomValue, 10) / 45;
  const SCANSequence = SCAN(array, head, direction, 13);
  showInfo(SCANSequence);
  moveElevator(SCANSequence, reset);
}

function reset() {
  array = [];
  const floorButtons = document.querySelectorAll(".number");
  floorButtons.forEach((btn) => {
    btn.style.backgroundColor = "";
  });
  document.getElementById(direction).style.transform = "";
}

function showInfo(SCAN) {
  document.getElementById("input-sequence").innerText =
    "Numbers pressed: " + array;
  document.getElementById("SCAN-sequence").innerText =
    "SCAN Seek Sequence: " + SCAN;
}
