import BaseEvent from "../events/base.event";
import print from "../utils/print";
import { STRINGS, PLAYER_ID, RESULT, COLOR } from "../constants/app.constant";
import chalk from "chalk";

class GameView {
  constructor(model) {
    this.model = model;

    /**Events */
    this.dropDiscEvent = new BaseEvent(this);

    /**listeners */
    this.model.recreateBoardEvent.attach(this.render.bind(this));
    this.model.gameOverEvent.attach(this.displayGameOver.bind(this));
  }

  render() {
    const board = this.model.getBoard();
    const rows = this.model.getRows();
    const cols = this.model.getCols();
    this.displayBoard(board, rows, cols);
  }

  displayBoard(board, rows, cols) {
    let grid = "";
    for (let r = rows - 1; r >= 0; r--) {
      let gridCols = "";
      for (let c = 0; c < cols; c++) {
        let cell = board[r][c];

        if (cell === PLAYER_ID.R) {
          cell = chalk.red.bold(cell);
        } else if (cell === PLAYER_ID.B) {
          cell = chalk.blue.bold(cell);
        }
        gridCols += `${cell} `;
      }
      grid += `${gridCols} \n`;
    }

    print(grid, true);
  }

  displayGameOver(sender, result) {
    let output = "";
    if (result === RESULT.RED_WIN || result === RESULT.BLUE_WIN) {
      const color = result === RESULT.RED_WIN ? COLOR.RED : COLOR.BLUE;
      output = STRINGS.ANNOUNCE_WINNER.replace("{0}", color);
    } else if (result === RESULT.DRAW) {
      output = STRINGS.ANNOUNCE_DRAW;
    }
    print(chalk.bold("xxxxxxxxxxxxxxxxxxxxxxxx"));
    print(chalk.bold(STRINGS.GAME_OVER));
    print(chalk.bold(output));
    print(chalk.bold("xxxxxxxxxxxxxxxxxxxxxxxx"));
    print("");
  }
}

export default GameView;
