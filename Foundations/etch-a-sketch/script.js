const container = document.querySelector(".container");

const newGridButton = document.createElement("button");
newGridButton.className = "new-grid";
newGridButton.innerText = "Generate Grid";
container.appendChild(newGridButton);

const createGrid = (size) => {
  const grid = document.createElement("div");
  grid.className = "grid";
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.className = "row";

    for (let j = 0; j < size; j++) {
      const box = document.createElement("div");
      box.className = "box";
      row.appendChild(box);
    }

    grid.appendChild(row);
  }

  container.appendChild(grid);
};

newGridButton.addEventListener("click", function (e) {
  let promptAnswer = "";
  let newGridSize = 0;
  while (true) {
    promptAnswer = prompt("Enter size of new grid (max 100):");

    if (!promptAnswer) return;
    promptAnswer = promptAnswer.trim();

    newGridSize = parseInt(promptAnswer);
    if (!newGridSize || newGridSize != promptAnswer) {
      alert("Please enter a valid integer!");
      continue;
    }

    if (newGridSize > 100) {
      alert("Please enter an integer 100 or smaller!");
      continue;
    }

    break;
  }

  // remove existing grid
  const currentGrid = document.querySelector(".grid");
  if (currentGrid) {
    currentGrid.remove();
  }

  createGrid(newGridSize);
});

container.addEventListener("mouseover", function (e) {
  if (e.target.className === "box") {
    e.target.style.backgroundColor = "black";
  }
});
