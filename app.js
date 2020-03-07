//Global Variables
const MAX_ARRAY_SIZE = 150;
const BAR_HEIGHT_MIN = 5;
const BAR_HEIGHT_MAX = 640;
const TICK_SPEED = 70;
const BAR_WIDTH = 4;
const BAR_COLOR = "#00FA9A";
const BAR_SWAPPING_COLOR = "lightcoral";
let currentBar = MAX_ARRAY_SIZE - 1;
let previousBar = MAX_ARRAY_SIZE - 1;

//Grabbing DOM Elements
const box = document.querySelector(".grid-box");
const buttonGen = document.querySelector("#btn-gen");
const buttonSort = document.querySelector("#btn-sort");
const buttonReset = document.querySelector("#btn-reset");

//Adding Event Listeners
buttonGen.addEventListener("click", generateArray);
buttonSort.addEventListener("click", sortBars);
buttonReset.addEventListener("click", resetButoon);

//Initializing Array
let array = [];
generateArray();

//Generates New Array
function generateArray() {
  //Removes the previous array bars
  let child = box.lastElementChild;
  while (child) {
    box.removeChild(child);
    child = box.lastElementChild;
  }
  array = [];

  //Generates New Array Call
  for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
    let randNum = randIntInRange(BAR_HEIGHT_MIN, BAR_HEIGHT_MAX);
    array.push(randNum);
  }

  //Creates New Bars To Append
  for (let i = 0; i < array.length; i++) {
    let bar = document.createElement("div");
    bar.classList.add("grid-bar");
    bar.style.width = `${BAR_WIDTH}px`;
    bar.style.height = `${array[i]}px`;
    bar.style.backgroundColor = BAR_COLOR;
    box.appendChild(bar);
  }
}

//Generates A Random Integer In Given Range
function randIntInRange(start, end) {
  return Math.round(Math.random() * (end - start) + start);
}

//Changes The Bar Height In DOM (Iterates)
function sortBars() {
  let i;
  buttonGen.disabled = true;
  buttonSort.disabled = true;
  for (i = 0; i < array.length; i++) {
    setTimeout(() => {
      sortArray();
    }, i * TICK_SPEED);
  }
  //Resets Bar Color Positions
  currentBar = MAX_ARRAY_SIZE - 1;
  previousBar = MAX_ARRAY_SIZE - 1;
}

//Resets Disabled Buttons
function resetButoon() {
  buttonGen.disabled = false;
  buttonSort.disabled = false;
}

//Changes Bar Height In DOM (Single)
function sortArray() {
  const bars = document.querySelectorAll(".grid-bar");
  boubleSort(array);

  for (let i = 0, j = 1; i < array.length; i++, j++) {
    bars[i].style.height = `${array[i]}px`;
  }

  //Changes Swapping Bar Color To Red And Green
  bars[currentBar].style.backgroundColor = BAR_SWAPPING_COLOR;
  if (previousBar > currentBar) {
    bars[previousBar].style.backgroundColor = BAR_COLOR;
    previousBar--;
  }
  currentBar--;
}

//Sorts The Given Array Using Bouble Sort
function boubleSort(arr) {
  let swapped = true;

  while (swapped) {
    for (let i = 0; i < arr.length; i++) {
      swapped = false;
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
    }
  }

  return arr;
}
