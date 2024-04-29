const container = document.querySelector(".container");
console.log(container);

const createGrid = (size) => {
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.className = "row";

    for (let j = 0; j < size; j++) {
      const box = document.createElement("div");
      box.className = "box";
      row.appendChild(box);
    }

    container.appendChild(row);
  }
};
