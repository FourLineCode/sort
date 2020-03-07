//Grabbing all DOM Elements
const box = document.querySelector(".grid-box");
const buttonGen = document.querySelector("#btn-gen");
const buttonSort = document.querySelector("#btn-sort");
const buttonReset = document.querySelector("#btn-reset");

//Adding Event Listeners
buttonGen.addEventListener("click", generateArray);
buttonSort.addEventListener("click", sortBars);
buttonReset.addEventListener("click", resetButoon);

//Generating Array
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

  //Generates new array call
  for (let i = 0; i < 150; i++) {
    let randNum = randIntInRange(5, 640);
    array.push(randNum);
  }

  //Creates new bars to append
  for (let i = 0; i < array.length; i++) {
    let bar = document.createElement("div");
    bar.classList.add("grid-bar");
    bar.style.width = "4px";
    bar.style.height = `${array[i]}px`;
    bar.style.backgroundColor = "#00FA9A";
    box.appendChild(bar);
  }
}

//Generates a random integer in given range
function randIntInRange(start, end) {
  return Math.round(Math.random() * (end - start) + start);
}

//Changes the bar height in DOM (iterates)
function sortBars() {
  let i;
  buttonGen.disabled = true;
  buttonSort.disabled = true;
  for (i = 0; i < array.length; i++) {
    setTimeout(() => {
      sortArray();
    }, i * 70);
  }
  f = 149;
  g = 149;
}

let f = 149;
let g = 149;
//Resets disabled buttons
function resetButoon() {
  buttonGen.disabled = false;
  buttonSort.disabled = false;
}

//Changes bar height in DOM (single)
function sortArray() {
  const bars = document.querySelectorAll(".grid-bar");
  boubleSort(array);

  for (let i = 0, j = 1; i < array.length; i++, j++) {
    bars[i].style.height = `${array[i]}px`;
  }

  bars[f].style.backgroundColor = "lightcoral";
  if (g > f) {
    bars[g].style.backgroundColor = "#00FA9A";
    g--;
  }
  f--;
}

//Sorts the given array using bouble sort
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
