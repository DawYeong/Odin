import { Player } from "./Player";
import { Gameboard } from "./Gameboard";
import { clearElement, createElement } from "../utils";
import { computerPlacement, computerShoot } from "./ComputerMoves";

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
    this.players = [new Player("Player 1"), new Player("Computer")];
    this.computerAvailableMoves = [
      ...Array(Gameboard.GRID_SIZE * Gameboard.GRID_SIZE).keys(),
    ];
  }

  #initEventHandlers() {
    const playButton = document.querySelector(".play");
    const selectionBoardWrapper = document.querySelector(
      ".selection-board-wrapper"
    );
    const orientation = document.querySelector(".orientation");
    const computerBoard = document.querySelector(".gameboards .computer");
    const playAgain = document.querySelector(".play-again-btn");

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

    computerBoard.addEventListener("click", (e) => {
      this.#handleShoot(e);
    });

    playAgain.addEventListener("click", () => this.#handlePlayAgain());
  }

  #setupGame() {
    this.#setupPlayers();
    document.querySelector(".play").classList.remove("active");
    document.querySelector(".gameboards").classList.remove("active");
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
    document.querySelector(".selection").classList.remove("active");
    document.querySelector(".gameboards").classList.add("active");
    this.#createBoard(
      document.querySelector(".player"),
      false,
      this.players[0],
      true
    );
    this.#createBoard(
      document.querySelector(".computer"),
      true,
      this.players[1],
      false
    );
  }

  #toggleOrientation() {
    this.isHorizontal = !this.isHorizontal;
  }

  #createBoard(parent, isHover, player, displayShips) {
    clearElement(parent);

    const board = createElement("div", "board", "", "");

    if (isHover) board.classList.add("hov");
    for (let i = 0; i < Gameboard.GRID_SIZE; i++) {
      for (let j = 0; j < Gameboard.GRID_SIZE; j++) {
        const gridCell = createElement("div", "grid-cell", "", "", {
          "data-row": i,
          "data-col": j,
        });

        if (player.gameBoard.grid[i][j][0] != null) {
          // ship, true => hit, false => place

          if (player.gameBoard.grid[i][j][1]) gridCell.classList.add("hit");
          else {
            displayShips
              ? gridCell.classList.add("place")
              : gridCell.classList.add("free");
          }
        } else {
          player.gameBoard.grid[i][j][1]
            ? gridCell.classList.add("miss")
            : gridCell.classList.add("free");
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
      this.players[0],
      true
    );
    if (this.players[0].isAllShipsPlaced()) {
      this.#startGame();
    }
  }

  #handleShoot(event) {
    // user always shoots first
    const userShot = this.#handleUserShoot(
      event,
      this.players[0],
      this.players[1]
    );
    if (userShot === -1) return;

    // user shot success, update computer board
    this.#createBoard(
      document.querySelector(".computer"),
      true,
      this.players[1],
      false
    );
    if (userShot === 1 && this.players[1].gameBoard.isAllShipSunk()) {
      // player 1 wins
      this.#handleGameOver(this.players[0]);
      return;
    }

    const enemyShot = computerShoot(
      this.players[1],
      this.players[0],
      this.computerAvailableMoves
    );

    this.#createBoard(
      document.querySelector(".player"),
      false,
      this.players[0],
      true
    );
    if (enemyShot === 1 && this.players[0].gameBoard.isAllShipSunk()) {
      // computer wins
      this.#handleGameOver(this.players[1]);
    }
  }

  #handleUserShoot(event, player, opponent) {
    if (!event.target.classList.contains("grid-cell")) return -1;
    const start = [
      parseInt(event.target.dataset.row),
      parseInt(event.target.dataset.col),
    ];

    return player.fire(start[0], start[1], opponent.gameBoard);
  }

  #handleGameOver(player) {
    document.querySelector(
      "dialog.play-again-dialog .game-over-message"
    ).textContent = `${player.name} won!`;

    document.querySelector("dialog.play-again-dialog").showModal();
  }

  #handlePlayAgain() {
    document.querySelector("dialog.play-again-dialog").close();
    this.#setupGame();
  }
}
