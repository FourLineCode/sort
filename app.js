//Global Variables
const BAR_HEIGHT_MIN = 5; //Minimum Height For Bars
const BAR_HEIGHT_MAX = 640; //Maximum Height For Bars
const BAR_COLOR = "#00FA9A"; //Color For Normal Bars
const BAR_SWAPPING_COLOR = "lightcoral"; //Color For Swapping Bars
let tick_speed = 70; //Initial Tick Speed For Swap
let bar_width = 4; //Initial Width Of Individual Bars
let max_array_size = 150; //Initial Maximum Size Of Array (Number Of Bars)
let currentBar = max_array_size - 1; //Swap Color Helper
let previousBar = max_array_size - 1; //Swap Color Helper
let array = []; //Creates Initial Array

//Grabbing DOM Elements
const box = document.querySelector(".grid-box");
const buttonGen = document.querySelector("#btn-gen");
const buttonSort = document.querySelector("#btn-sort");
const buttonReset = document.querySelector("#btn-reset");
const rangeSlider = document.querySelector("#array-size");

//Initializing Array
generateArray(max_array_size);

//Adding Event Listeners
buttonGen.addEventListener("click", () => {
  generateArray(max_array_size);
});
buttonSort.addEventListener("click", sortBars);
buttonReset.addEventListener("click", resetButoon);
rangeSlider.addEventListener("input", changeArraySize);

//Generates New Array
function generateArray(maxSize) {
  //Removes the previous array bars
  let child = box.lastElementChild;
  while (child) {
    box.removeChild(child);
    child = box.lastElementChild;
  }
  array = [];

  //Generates New Array Call
  for (let i = 0; i < maxSize; i++) {
    let randNum = randIntInRange(BAR_HEIGHT_MIN, BAR_HEIGHT_MAX);
    array.push(randNum);
  }

  //Creates New Bars To Append
  for (let i = 0; i < array.length; i++) {
    let bar = document.createElement("div");
    bar.classList.add("grid-bar");
    bar.classList.add(`bar${i}`);
    bar.style.width = `${bar_width}px`;
    bar.style.height = `${array[i]}px`;
    bar.style.backgroundColor = BAR_COLOR;
    box.appendChild(bar);
  }
}

//Generates A Random Integer In Given Range
function randIntInRange(start, end) {
  return Math.round(Math.random() * (end - start) + start);
}

//Changes Max Array Size
function changeArraySize() {
  let sliderValue = rangeSlider.value;
  const rangeLabel = document.querySelector("#array-size-label");

  //Changes Max Array Size To The Slider Value
  max_array_size = sliderValue;
  currentBar = max_array_size - 1;
  previousBar = max_array_size - 1;
  rangeLabel.textContent = `Size: ${sliderValue}`;

  //Changes Bar Width And Tick Speed According To Array Size
  if (max_array_size > 100 && max_array_size <= 200) {
    bar_width = 4;
    tick_speed = 70;
  } else if (max_array_size <= 100 && max_array_size >= 50) {
    bar_width = 6;
    tick_speed = 100;
  } else if (max_array_size < 50) {
    bar_width = 8;
    tick_speed = 150;
  } else if (max_array_size > 200) {
    bar_width = 2;
    tick_speed = 30;
  }

  //Generates New Array For Slider Changes
  generateArray(max_array_size);
}

//Changes The Bar Height In DOM (Iterates)
function sortBars() {
  let i;
  buttonGen.disabled = true;
  buttonSort.disabled = true;
  rangeSlider.disabled = true;
  for (i = 0; i < array.length; i++) {
    setTimeout(() => {
      sortArray();
    }, i * tick_speed);
  }
  //Resets Bar Color Positions
  currentBar = max_array_size - 1;
  previousBar = max_array_size - 1;
}

//Resets Disabled Buttons
function resetButoon() {
  buttonGen.disabled = false;
  buttonSort.disabled = false;
  rangeSlider.disabled = false;
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
