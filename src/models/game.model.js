import { RESULT, COLOR, COLUMN } from "../constants/app.constant";
import BaseModel from "../core/base.model";

class GameModel extends BaseModel {
  constructor() {
    super();
    this.rows = 6;
    this.cols = 7;
    this.emptyDisc = "o";
    this.board = this.createBoard(this.rows, this.cols, this.emptyDisc);
  }

  setBoard(board) {
    this.board = board;
    this.notifyObservers();
  }

  getBoard() {
    return this.board;
  }

  getCols() {
    return this.cols;
  }

  getRows() {
    return this.rows;
  }

  getEmptyDisc() {
    return this.emptyDisc;
  }

  /**
   * checks for valid move
   * @param {int} col
   * @return string
   */

  isValidMove(col) {
    let msg = COLUMN.VALID;

    if (isNaN(col)) {
      msg = COLUMN.INVALID;
    } else if (col > this.cols || col < 1) {
      msg = COLUMN.INVALID;
    } else if (this.board[this.rows - 1][col - 1] !== this.emptyDisc) {
      msg = COLUMN.FULL;
    }
    return msg;
  }

  /**
   * create empty board
   * @param {int} rows
   * @param {int} cols
   * @param {string} emptyDisc
   * @return array
   */

  createBoard(rows, cols, emptyDisc) {
    let board = [];
    for (let y = 0; y < rows; y++) {
      board[y] = [];
      for (let x = 0; x < cols; x++) {
        board[y][x] = emptyDisc;
      }
    }
    return board;
  }

  /**
   * check for four connections
   * @param {array} board
   * @param {string} disc
   * @return boolean
   */
  connectFour(board, disc) {
    let connected = false;

    // check vertical
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows - 3; j++) {
        if (
          board[j][i] == disc &&
          board[j + 1][i] == disc &&
          board[j + 2][i] == disc &&
          board[j + 3][i] == disc
        ) {
          connected = true;
          break;
        }
      }
    }

    // check horizontal
    if (!connected) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols - 3; j++) {
          if (
            board[i][j] == disc &&
            board[i][j + 1] == disc &&
            board[i][j + 2] == disc &&
            board[i][j + 3] == disc
          ) {
            connected = true;
            break;
          }
        }
      }
    }

    //check diagonal(/)
    if (!connected) {
      for (let i = 3; i < this.rows; i++) {
        for (let j = 3; j < this.cols; j++) {
          if (
            board[i][j] == disc &&
            board[i - 1][j - 1] == disc &&
            board[i - 2][j - 2] == disc &&
            board[i - 3][j - 3] == disc
          ) {
            connected = true;
            break;
          }
        }
      }
    }

    //check diagonal(\)
    if (!connected) {
      for (let i = 3; i < this.rows; i++) {
        for (let j = 3; j >= 0; j--) {
          if (
            board[i][j] == disc &&
            board[i - 1][j + 1] == disc &&
            board[i - 2][j + 2] == disc &&
            board[i - 3][j + 3] == disc
          ) {
            connected = true;
            break;
          }
        }
      }
    }

    return connected;
  }

  /**
   * find the outcome of game
   * @param {array} board
   * @param {Player} player
   * @return RESULT || null
   */
  findGameResult(board, player) {
    let result = null;

    if (this.isFull()) {
      result = RESULT.DRAW;
      this.notifyObservers(result);
    } else if (this.connectFour(board, player.id)) {
      const color = player.color;
      result = color === COLOR.BLUE ? RESULT.BLUE_WIN : RESULT.RED_WIN;
      this.notifyObservers(result);
    }
    return result;
  }

  /**
   * check if the board is full
   * @return boolean
   */
  isFull() {
    let full = true;
    for (let c = 0; c < this.cols; c++) {
      if (this.board[this.rows - 1][c] == this.emptyDisc) {
        full = false;
      }
    }
    return full;
  }

  /**
   * find all valid moves
   * @return array
   */

  findAllValidMoves() {
    const allValidMoves = [];
    for (let i = 1; i <= this.cols; i++) {
      if (this.isValidMove(i) === COLUMN.VALID) {
        allValidMoves.push(i);
      }
    }
    return allValidMoves;
  }
}

export default GameModel;
