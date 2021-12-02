const GAME_SIZE_ROW = 20;
const GAME_SIZE_COLUMN = 20;
const ELEMENTS = [
  { sky: 0, skyStyle: "lightblue" },
  { ground: 1, groundStyle: "rgb(136, 91, 60)" },
  { tree: 2, treeStyle: "rgb(59, 38, 24)" },
  { cloud: 3 },
  { leaf: 4 },
  { rock: 5 },
  { groundTop: 6 },
];

const container = document.querySelector(".container");
container.style.gridTemplateRows = `repeat(${GAME_SIZE_ROW}, 1fr)`;
container.style.gridTemplateColumns = `repeat(${GAME_SIZE_COLUMN}, 1fr)`;

container.addEventListener("click", (e) => {
  console.log(e.target.id);
});

function generateTree(rs, re, cs, ce) {
  if (div.id === `${1},${1}`) {
    div.style.background = "black";
  }
}

function createBoard() {
  let insideMatrix = [];
  for (let row = 0; row < GAME_SIZE_ROW; row++) {
    insideMatrix[row] = [];
    for (let column = 1; column <= GAME_SIZE_COLUMN; column++) {
      const box = document.createElement("div");
      box.setAttribute("id", `${row},${column}`);
      box.setAttribute("class", `box`);
      box.style.height = "100%";
      // div.innerText = column + row * GAME_SIZE_ROW;
      box.innerText = box.id;

      if (row > 13) {
        box.style.background = ELEMENTS[1].groundStyle;
        insideMatrix[row][column] = ELEMENTS[1].ground;
      } else {
        box.style.background = ELEMENTS[0].skyStyle;
        insideMatrix[row][column] = ELEMENTS[0].sky;
      }
      container.appendChild(box);
    }
  }
  let div = document.querySelector(".box");
  console.log(div.id);
  console.table(insideMatrix);
}
createBoard();
