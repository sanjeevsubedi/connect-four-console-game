import BaseController from "../core/base.controller";
import { PLAYER_TYPE, STRINGS, COLUMN } from "../constants/app.constant";
import getReadlineInterface from "../utils/readline-interface";

class GameController extends BaseController {
  constructor(view, model, appState, aIModel) {
    super();
    this.view = view;
    this.model = model;
    this.appState = appState;
    this.aIModel = aIModel;
  }

  load() {
    // render empty board
    this.view.render();

    // initiate player moves
    this.initiateMove();
  }

  initiateMove() {
    const currentPlayer = this.appState.getTurn();

    if (currentPlayer.type === PLAYER_TYPE.COMPUTER) {
      this.triggerAIMove();
    } else {
      const validMoves = this.model.findAllValidMoves().join(",");
      const validMovesInfo = STRINGS.VALID_COLUMN.replace("{0}", validMoves);
      const question = validMovesInfo.replace(
        "{1}",
        this.appState.getTurn().color
      );
      this.promptUserMove(question, col => {
        this.dropDisc(col);
      });
    }
  }

  triggerAIMove() {
    const difficulty = this.appState.getDifficulty();
    const bestMove = this.aIModel.findNextBestMove(difficulty);
    this.dropDisc(bestMove);
  }

  promptUserMove(question, callback) {
    let col;
    const rl = getReadlineInterface();

    rl.question(question, answer => {
      col = answer;
      const validity = this.model.isValidMove(col);
      if (validity === COLUMN.INVALID || validity === COLUMN.FULL) {
        rl.close();
        const question =
          validity === COLUMN.INVALID
            ? STRINGS.INVALID_COLUMN
            : STRINGS.FULL_COLUMN;
        this.promptUserMove(question, callback);
      } else {
        rl.close();
        callback(col);
      }
    });
  }

  dropDisc(col) {
    const board = this.model.getBoard();
    const rows = this.model.getRows();
    const emptyDisc = this.model.getEmptyDisc();

    let r = 0;
    while (board[r][col - 1] != emptyDisc && r < rows) {
      r++;
    }

    // update board with current player's disc
    const currentPlayer = this.appState.getTurn();
    const disc = currentPlayer.id;
    board[r][col - 1] = disc;
    this.model.setBoard(board);

    // check if the game is draw or is won by any of the players
    const outcome = this.model.findGameResult(board, currentPlayer);

    if (outcome) {
      this.appState.setGameResult(outcome);
      return;
    }

    // switch player
    this.switchPlayer(currentPlayer);
  }

  switchPlayer(currentPlayer) {
    const players = this.appState.getPlayers();
    const nextPlayer = players.find(player => {
      return player.color != currentPlayer.color;
    });
    this.appState.setTurn(nextPlayer);

    // initialize next move
    this.initiateMove();
  }
}

export default GameController;
