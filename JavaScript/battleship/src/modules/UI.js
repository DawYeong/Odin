import { Player } from "./Player";
import { Gameboard } from "./Gameboard";
import { clearElement, createElement } from "../utils";
import { computerPlacement } from "./computerPlacement";

const TEST = 5;
export class UI {
  constructor() {
    this.players = [];
    this.turn = false;
    this.isHorizontal = false;
    this.userShips = 0;
  }

  init() {
    this.#initEventHandlers();
  }

  #setupPlayers() {
    this.players = [new Player(), new Player()];
  }

  #initEventHandlers() {
    const playButton = document.querySelector(".play");
    const selection = document.querySelector(".selection");
    const selectionBoardWrapper = document.querySelector(
      ".selection-board-wrapper"
    );
    const orientation = document.querySelector(".orientation");

    playButton.addEventListener("click", () => this.#setupGame());

    orientation.addEventListener("click", () => this.#toggleOrientation());

    selectionBoardWrapper.addEventListener("mouseover", (e) =>
      this.#handleGridMouseEvent(e, true)
    );

    selectionBoardWrapper.addEventListener("mouseout", (e) =>
      this.#handleGridMouseEvent(e, false)
    );

    selectionBoardWrapper.addEventListener("click", (e) => {
      this.#handleUserPlaceShip(e);
    });
  }

  #setupGame() {
    console.log("SETUP GAME");
    this.#setupPlayers();
    document.querySelector(".play").classList.remove("active");
    const selection = document.querySelector(".selection");
    selection.classList.add("active");
    this.#createBoard(
      document.querySelector(".selection-board-wrapper"),
      true,
      this.players[0],
      true
    );
    computerPlacement(this.players[1]);
  }

  #startGame() {
    console.log("START GAME");
    document.querySelector(".selection").classList.remove("active");
    document.querySelector(".gameboards").classList.add("active");
    this.#createBoard(
      document.querySelector(".player"),
      false,
      this.players[0],
      true
    );
    console.log(this.players[1].gameBoard.grid);
    this.#createBoard(
      document.querySelector(".computer"),
      true,
      this.players[1],
      true
    );
  }

  #toggleOrientation() {
    this.isHorizontal = !this.isHorizontal;
    document.querySelector(".orientation").textContent = this.isHorizontal
      ? "Horizontal"
      : "Vertical";
  }

  #createBoard(parent, isHover, player, displayShips) {
    clearElement(parent);

    const board = createElement("div", "board", "", "");

    if (isHover) board.classList.add("hov");
    console.log(player.gameBoard.grid);
    for (let i = 0; i < Gameboard.GRID_SIZE; i++) {
      for (let j = 0; j < Gameboard.GRID_SIZE; j++) {
        const gridCell = createElement("div", "grid-cell", "", "", {
          "data-row": i,
          "data-col": j,
        });

        if (player.gameBoard.grid[i][j][0] != null) {
          // ship, true => hit, false => place
          player.gameBoard.grid[i][j][1]
            ? gridCell.classList.add("hit")
            : gridCell.classList.add("place");

          if (player.gameBoard.grid[i][j][1]) gridCell.classList.add("hit");
          else {
            if (displayShips) gridCell.classList.add("place");
          }
        } else {
          if (player.gameBoard.grid[i][j][1]) gridCell.classList.add("miss");
        }

        board.appendChild(gridCell);
      }
    }

    parent.appendChild(board);
  }

  #getGridCells(row, col, player) {
    const gridCells = [];

    for (let i = 0; i < player.getCurrentShipLength(); i++) {
      gridCells.push(
        document.querySelector(
          `.selection-board-wrapper .grid-cell[data-row='${
            row + (this.isHorizontal ? 0 : i)
          }'][data-col='${col + (this.isHorizontal ? i : 0)}']`
        )
      );
    }

    return gridCells;
  }

  #handleGridMouseEvent(event, isHover) {
    if (!event.target.classList.contains("grid-cell")) return;

    const start = [
      parseInt(event.target.dataset.row),
      parseInt(event.target.dataset.col),
    ];
    if (
      this.players[0].gameBoard.checkCanPlace(
        start[0],
        start[1],
        this.players[0].getCurrentShipLength(),
        this.isHorizontal
      )
    ) {
      const gridCells = this.#getGridCells(start[0], start[1], this.players[0]);
      gridCells.forEach((gridCell) =>
        isHover
          ? gridCell.classList.add("valid")
          : gridCell.classList.remove("valid")
      );
    } else {
      isHover
        ? event.target.classList.add("invalid")
        : event.target.classList.remove("invalid");
    }
  }

  #handleUserPlaceShip(event) {
    if (!event.target.classList.contains("grid-cell")) return;

    const start = [
      parseInt(event.target.dataset.row),
      parseInt(event.target.dataset.col),
    ];

    this.players[0].placeShip(start[0], start[1], this.isHorizontal);
    this.#createBoard(
      document.querySelector(".selection-board-wrapper"),
      true,
      this.players[0]
    );
    if (this.players[0].isAllShipsPlaced()) {
      console.log("game start!");
      this.#startGame();
    }
  }
}
