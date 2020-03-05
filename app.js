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
console.log(array);
generateArray();

//Generates New Array
function generateArray() {
  let child = box.lastElementChild;
  while (child) {
    box.removeChild(child);
    child = box.lastElementChild;
  }
  array = [];

  for (let i = 0; i < 150; i++) {
    let randNum = randIntInRange(5, 640);
    array.push(randNum);
  }
  console.log(array);

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
    }, i * 100);
  }
}

//Resets disabled buttons
function resetButoon() {
  buttonGen.disabled = false;
  buttonSort.disabled = false;
}

//Changes bar height in DOM (single)
function sortArray() {
  let bars = document.querySelectorAll(".grid-bar");
  boubleSort(array);

  for (let i = 0, j = 1; i < array.length; i++, j++) {
    bars[i].style.height = `${array[i]}px`;
  }
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
