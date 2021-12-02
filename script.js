// const GAME_SIZE_ROW = 20;
// const GAME_SIZE_COLUMN = 20;
const ELEMENTS = [
  { 0: "sky" },
  { 1: "ground" },
  { 2: "leaf" },
  { 3: "tree" },
  { 4: "cloud" },
  { 5: "stone" },
  { 6: "ground-top" },
];
let worldMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
  [0, 2, 2, 2, 0, 0, 0, 0, 0, 5, 0, 3, 0, 0, 5],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
console.log(ELEMENTS);
const container = document.querySelector(".container");
container.style.gridTemplateRows = `repeat(${worldMatrix.length}, 1fr)`;
container.style.gridTemplateColumns = `repeat(${worldMatrix[0].length}, 1fr)`;

let createWorld = () => {
  for (let row = 0; row < worldMatrix.length; row++) {
    for (let col = 0; col < worldMatrix[row].length; col++) {
      const box = document.createElement("div");
      let boxClass = worldMatrix[row][col];
      box.setAttribute("class", `${ELEMENTS[boxClass][boxClass]}`);
      box.style.height = "100%";
      console.log(ELEMENTS[boxClass][boxClass]);
      container.appendChild(box);
    }
  }
};
createWorld();
