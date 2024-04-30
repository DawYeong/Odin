const container = document.querySelector(".container");

const newGridButton = document.createElement("button");
newGridButton.className = "new-grid";
newGridButton.innerText = "Generate Grid";
container.appendChild(newGridButton);

let mode = false;
const modes = ["random-color", "darkening"];

const modeButton = document.createElement("button");
modeButton.className = "mode";
modeButton.innerText = modes[+mode];
container.appendChild(modeButton);

const randomInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

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

modeButton.addEventListener("click", function (e) {
  mode = !mode;
  modeButton.innerText = modes[+mode];

  const currentGrid = document.querySelector(".grid");
  if (currentGrid) {
    const currentSize = currentGrid.children.length;
    currentGrid.remove();
    createGrid(currentSize);
  }
});

const generateRandomColor = () => {
  return `rgb(${randomInterval(0, 255)}, ${randomInterval(
    0,
    255
  )}, ${randomInterval(0, 255)})`;
};

container.addEventListener("mouseover", function (e) {
  if (e.target.className === "box") {
    if (mode) {
      // darkening effect
      const backgroundColor = getComputedStyle(e.target).getPropertyValue(
        "background-color"
      );

      const backgroundFields = backgroundColor.split(",");
      e.target.style.backgroundColor =
        backgroundFields.length === 4
          ? `rgba(0, 0, 0, ${parseFloat(backgroundFields.at(-1)) + 0.1})`
          : "rgba(0, 0, 0, 1)";
    } else {
      // random color
      e.target.style.backgroundColor = generateRandomColor();
    }
  }
});
