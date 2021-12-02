const ELEMENTS = [
  { 0: "sky" },
  { 1: "ground" },
  { 2: "leaf" },
  { 3: "tree" },
  { 4: "cloud" },
  { 5: "stone" },
  { 6: "ground-top" },
];
let TOOL_STATE = "";
let SELECTED_STATE = "";

let worldMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
  [0, 2, 2, 2, 0, 0, 0, 0, 0, 5, 0, 3, 0, 0, 5],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const container = document.querySelector(".container");
const sidebar = document.querySelector(".sidebar");
const selected = document.querySelector(".selected");
const tools = document.querySelectorAll(".tools");
container.style.gridTemplateRows = `repeat(${worldMatrix.length}, 1fr)`;
container.style.gridTemplateColumns = `repeat(${worldMatrix[0].length}, 1fr)`;

let createWorld = () => {
  for (let row = 0; row < worldMatrix.length; row++) {
    for (let col = 0; col < worldMatrix[row].length; col++) {
      const box = document.createElement("div");
      let boxClass = worldMatrix[row][col];
      box.setAttribute("class", `${ELEMENTS[boxClass][boxClass]}`);
      box.style.height = "100%";
      container.appendChild(box);
    }
  }
};
createWorld();

let toolsColorChange = () => {
  for (let tool of tools) {
    tool.style.backgroundColor = "black";
  }
};

sidebar.addEventListener("click", (e) => {
  toolsColorChange();
  if (e.target !== selected) {
    e.target.style.backgroundColor = "blue";
    TOOL_STATE = e.target.getAttribute("data-type");
  }
  if (SELECTED_STATE && e.target === selected) {
    selected.classList.remove(selected.classList[1]);
    TOOL_STATE = "";
  }
});

container.addEventListener("click", (e) => {
  let elementType = e.target.getAttribute("class");
  if (TOOL_STATE === "shovel") {
    if (elementType === "ground" || elementType === "ground-top") {
      e.target.classList.remove(elementType);
      e.target.classList.add("sky");
      selected.classList.add(elementType);
      SELECTED_STATE = elementType;
    }
  }
  if (TOOL_STATE === "pick") {
    if (elementType === "stone") {
      e.target.classList.remove(elementType);
      e.target.classList.add("sky");
      selected.classList.add(elementType);
      SELECTED_STATE = elementType;
    }
  }
  if (TOOL_STATE === "axe") {
    if (elementType === "tree" || elementType === "leaf") {
      e.target.classList.remove(elementType);
      e.target.classList.add("sky");
      selected.classList.add(elementType);
      SELECTED_STATE = elementType;
    }
  }
  if (SELECTED_STATE && TOOL_STATE === "") {
    e.target.classList.remove(elementType);
    e.target.classList.add(SELECTED_STATE);
    SELECTED_STATE = "";
  }
  console.log(SELECTED_STATE, TOOL_STATE);
});
