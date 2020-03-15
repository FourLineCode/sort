//Global Variables
const BAR_HEIGHT_MIN = 5; //Minimum Height For Bars
const BAR_HEIGHT_MAX = 640; //Maximum Height For Bars
const BAR_COLOR = "#00FA9A"; //Color For Normal Bars
const SWAPPED_BAR_COLOR = "lightcoral"; //Color For Swapped Bars
let max_array_size = 150; //Initial Maximum Size Of Array (Number Of Bars)
let primary_tick_speed = 10; //Initial Tick Speed For Swap
let secondary_tick_speed = primary_tick_speed * max_array_size; //Initial Tick Speed For Swap
let speed = 1; //Initial Sorting Speed
let bar_width = 4; //Initial Width Of Individual Bars
let currentBar = max_array_size - 1; //Swap Color Helper
let previousBar = max_array_size - 1; //Swap Color Helper
let array = []; //Creates Initial Array

//Grabbing DOM Elements
const box = document.querySelector(".grid-box");
const buttonGen = document.querySelector("#btn-gen");
const buttonSort = document.querySelector("#btn-sort");
const buttonSpeed = document.querySelector("#btn-speed");
// const buttonReset = document.querySelector("#btn-reset");
const rangeSlider = document.querySelector("#array-size");
const rangeLabel = document.querySelector("#array-size-label");

//Initializing Array & Components
generateArray(max_array_size);
rangeSlider.value = max_array_size;
rangeLabel.textContent = `Size: ${max_array_size}`;
buttonSpeed.disabled = true;

//Adding Event Listeners
buttonGen.addEventListener("click", () => {
  generateArray(max_array_size);
});
buttonSort.addEventListener("click", sortBars2);
buttonSpeed.addEventListener("click", increaseSpeed);
// buttonReset.addEventListener("click", resetButoon);
rangeSlider.addEventListener("input", changeArraySize);

//Generates New Array
function generateArray(maxSize) {
  //Resets Sorting Speed To 0
  setSpeedCount(1);
  speed = 2;

  //Resets Buttons
  buttonSort.disabled = false;
  buttonSpeed.disabled = true;

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

  //Changes Max Array Size To The Slider Value
  max_array_size = sliderValue;
  currentBar = max_array_size - 1;
  previousBar = max_array_size - 1;
  rangeLabel.textContent = `Size: ${sliderValue}`;

  //Changes Bar Width And Tick Speed According To Array Size
  if (max_array_size > 100 && max_array_size <= 200) {
    bar_width = 4;
    primary_tick_speed = 10;
    secondary_tick_speed = primary_tick_speed * max_array_size;
  } else if (max_array_size <= 100 && max_array_size >= 50) {
    bar_width = 6;
    primary_tick_speed = 15;
    secondary_tick_speed = primary_tick_speed * max_array_size;
  } else if (max_array_size < 50) {
    bar_width = 8;
    primary_tick_speed = 20;
    secondary_tick_speed = primary_tick_speed * max_array_size;
  } else if (max_array_size > 200) {
    bar_width = 2;
    primary_tick_speed = 5;
    secondary_tick_speed = primary_tick_speed * max_array_size;
  }

  //Generates New Array For Slider Changes
  generateArray(max_array_size);
}

//Changes The Bar Height In DOM (Iterates)
// function sortBars() {
//   let i;
//   buttonGen.disabled = true;
//   buttonSort.disabled = true;
//   rangeSlider.disabled = true;
//   for (i = 0; i < array.length; i++) {
//     setTimeout(() => {
//       sortArray();
//     }, i * primary_tick_speed);
//   }
//   //Resets Bar Color Positions
//   currentBar = max_array_size - 1;
//   previousBar = max_array_size - 1;
// }

//Bouble Sorting Animation
function sortBars2() {
  //Disables/Enables Buttons When Sorting
  // buttonGen.disabled = true;
  buttonSort.disabled = true;
  // rangeSlider.disabled = true;
  buttonSpeed.disabled = false;

  bubbleSort(array);
  const bars = document.querySelectorAll(".grid-bar");
  let lastBar = array.length - 1;

  for (let k = 0; k < array.length; k++) {
    setTimeout(() => {
      for (let i = 1; i < array.length; i++) {
        setTimeout(() => {
          let currentHeight = deletePX(bars[i - 1].style.height);
          let nextHeight = deletePX(bars[i].style.height);

          //Sorts Bars
          if (currentHeight > nextHeight) {
            bars[i - 1].style.height = `${nextHeight}px`;
            bars[i].style.height = `${currentHeight}px`;
          }

          //Changes Color Of Sorted Arrays
          if (lastBar >= 0) {
            let lastHeight = deletePX(bars[lastBar].style.height);
            if (lastHeight === array[lastBar]) {
              bars[lastBar].style.backgroundColor = SWAPPED_BAR_COLOR;
              lastBar--;
            }
          }
        }, i * primary_tick_speed);
      }
    }, k * secondary_tick_speed);
  }

  //Resets Bar Color Positions
  currentBar = max_array_size - 1;
  previousBar = max_array_size - 1;
}

//Deletes px From Height Value
function deletePX(str) {
  let str2 = str.split("");
  str2.pop();
  str2.pop();
  return parseInt(str2.join(""));
}

//Increases Sorting Speed
function increaseSpeed() {
  if (speed <= 10) {
    //Changes Speed Multiplier
    setSpeedCount(speed++);

    sortBars2();
  }
}

//Sets Speed Counter Text
function setSpeedCount(num) {
  buttonSpeed.textContent = `x${num} Speed`;
}

//Resets Disabled Buttons
// function resetButoon() {
//   // buttonGen.disabled = false;
//   buttonSort.disabled = false;
//   // rangeSlider.disabled = false;
//   buttonSpeed.disabled = true;
// }

//Changes Bar Height In DOM (Single)
// function sortArray() {
//   const bars = document.querySelectorAll(".grid-bar");
//   bubbleSort(array);

//   for (let i = 0, j = 1; i < array.length; i++, j++) {
//     bars[i].style.height = `${array[i]}px`;
//   }

//   //Changes Swapping Bar Color To Red And Green
//   bars[currentBar].style.backgroundColor = SWAPPED_BAR_COLOR;
//   if (previousBar > currentBar) {
//     bars[previousBar].style.backgroundColor = BAR_COLOR;
//     previousBar--;
//   }
//   currentBar--;
// }

//Sorts The Given Array Using Bouble Sort
// function bubbleSort(arr) {
//   let swapped = true;

//   while (swapped) {
//     for (let i = 0; i < arr.length; i++) {
//       swapped = false;
//       if (arr[i] > arr[i + 1]) {
//         let temp = arr[i];
//         arr[i] = arr[i + 1];
//         arr[i + 1] = temp;
//         swapped = true;
//       }
//     }
//   }

//   console.log(arr);
//   return arr;
// }

function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (arr[j] > arr[j + 1]) {
        let tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
  return arr;
}
