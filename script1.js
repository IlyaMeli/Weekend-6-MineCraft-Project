const ELEMENTS = [
  { 0: "sky" },
  { 1: "ground" },
  { 2: "leaf" },
  { 3: "tree" },
  { 4: "cloud" },
  { 5: "stone" },
  { 6: "ground-top" },
];
let ELEMENTS_BOX = [
  { type: "tree", amount: 0 },
  { type: "ground", amount: 0 },
  { type: "ground-top", amount: 0 },
  { type: "stone", amount: 0 },
  { type: "leaf", amount: 0 },
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

//empty matrix ->
let matrix = [];

//items generators ->
function generateTree(col) {
  matrix[10][col] = 3;
  matrix[9][col] = 3;
  matrix[8][col] = 3;
  matrix[7][col] = 3;
  matrix[6][col] = 2;
  matrix[5][col] = 2;
  matrix[7][col + 1] = 2;
  matrix[6][col + 1] = 2;
  matrix[5][col + 1] = 2;
  matrix[5][col - 1] = 2;
  matrix[6][col - 1] = 2;
  matrix[7][col - 1] = 2;
}
function generateCloud(ofsetX = 0, ofsetY = 0) {
  matrix[1 + ofsetX][3 + ofsetY] = 4;
  matrix[1 + ofsetX][4 + ofsetY] = 4;
  matrix[1 + ofsetX][5 + ofsetY] = 4;
  matrix[1 + ofsetX][6 + ofsetY] = 4;
  matrix[2 + ofsetX][4 + ofsetY] = 4;
  matrix[2 + ofsetX][5 + ofsetY] = 4;
  matrix[2 + ofsetX][6 + ofsetY] = 4;
  matrix[2 + ofsetX][7 + ofsetY] = 4;
  matrix[2 + ofsetX][8 + ofsetY] = 4;
  matrix[3 + ofsetX][3 + ofsetY] = 4;
  matrix[3 + ofsetX][4 + ofsetY] = 4;
  matrix[3 + ofsetX][5 + ofsetY] = 4;
}
function generateTopGround(row, end) {
  for (let i = 0; i < end; i++) {
    matrix[row][i] = 6;
  }
}
function generateStone(col) {
  matrix[10][col] = 5;
}
function generateBush(row, col) {
  matrix[row][col] = 2;
}

// matrix creation
function createMaxtrix(rowEnd, columnEnd) {
  for (let row = 0; row < rowEnd; row++) {
    matrix[row] = [];
    for (let column = 0; column < columnEnd; column++) {
      if (row > 11) {
        matrix[row][column] = 1;
      } else {
        matrix[row][column] = 0;
      }
    }
  }
  generateTree(10);
  generateCloud();
  generateTopGround(11, columnEnd);
  generateStone(1);
  generateStone(2);
  generateStone(8);
  generateBush(10, 4);
  generateBush(10, 5);
  generateBush(10, 6);
  generateBush(9, 5);
}
createMaxtrix(15, 15);

//dom selection ->
const container = document.querySelector(".container");
const reset = document.querySelector(".reset-game");
const worldwrap = document.querySelector(".worldwrap");
const menuContainer = document.querySelector(".menu-container");
const sidebar = document.querySelector(".sidebar");
const selected = document.querySelector(".selected");
const tools = document.querySelectorAll(".tools");
container.style.gridTemplateRows = `repeat(${matrix.length}, 1fr)`;
container.style.gridTemplateColumns = `repeat(${matrix[0].length}, 1fr)`;
const inventory = document.querySelector(".inventory");

//WORLD DRAWING FUNCTION ->
let drawWorld = () => {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const box = document.createElement("div");
      let boxClass = matrix[row][col];
      box.setAttribute("class", `${ELEMENTS[boxClass][boxClass]}`);
      box.style.height = "100%";
      container.appendChild(box);
    }
  }
};
// changes background color back to black ->
let toolsColorChange = () => {
  for (let tool of tools) {
    tool.style.backgroundColor = "black";
  }
};
//sidebar functions
sidebar.addEventListener("click", (e) => {
  toolsColorChange();
  if (e.target !== selected && e.target !== sidebar && e.target !== reset) {
    e.target.style.backgroundColor = "blue";
    TOOL_STATE = e.target.getAttribute("data-type");
  }
  if (SELECTED_STATE && e.target === selected) {
    TOOL_STATE = "";
  }

  //   ELEMENTS_BOX.forEach((element) => {
  //     if (e.target.className === element.type && element.amount > 0) {
  //       element.amount--;
  //       document.querySelector(`.inventory .${element.type}`).innerText =
  //         element.amount;
  //       SELECTED_STATE = element.type;
  //       console.log("check");
  //     }
  //   });

  //reset ->
  if (e.target.className === "reset-game") {
    // ELEMENTS_BOX.forEach((element) => {
    //   element.amount = 0;
    //   document.querySelector(`.inventory .${element.type}`).innerText =
    //     element.amount;
    // });
    TOOL_STATE = "";
    SELECTED_STATE = "";
    selected.className = "selected";
    container.innerHTML = "";
    drawWorld();
  }
});
//main screen functions ->
function toolFunctionality(e, elementType, tool, type1, type2 = null) {
  if (TOOL_STATE === tool) {
    if (elementType === type1 || elementType === type2) {
      e.target.classList.remove(elementType);
      e.target.classList.add("sky");
      if (selected.classList.length > 1) {
        selected.classList = "selected";
      }
      selected.classList.add(elementType);
      SELECTED_STATE = elementType;
    }
  }
}

container.addEventListener("click", (e) => {
  let elementType = e.target.getAttribute("class");
  toolFunctionality(e, elementType, "shovel", "ground", "ground-top");
  toolFunctionality(e, elementType, "pick", "stone");
  toolFunctionality(e, elementType, "axe", "tree", "leaf");
  if (SELECTED_STATE && TOOL_STATE === "") {
    selected.className = "selected";
    e.target.classList.add(SELECTED_STATE);
    e.target.classList.remove(elementType);
    SELECTED_STATE = "";
  }
});
//start screen function
menuContainer.addEventListener("click", (e) => {
  if (e.target.className === "start-b") {
    drawWorld();
    menuContainer.style.transitionDuration = "0.5s";
    menuContainer.style.opacity = "0";
    menuContainer.style.height = "0";
    e.target.style.display = "none";
  }
});
