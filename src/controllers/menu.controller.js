import BaseController from "../core/base.controller";
import getReadlineInterface from "../utils/readline-interface";
import PlayerModel from "../models/player.model";
import {
  PAGE,
  DIFFICULTY,
  COLOR,
  PLAYER_TYPE,
  PLAYER_ID,
  STRINGS,
  CONFIRM
} from "../constants/app.constant";

class MenuController extends BaseController {
  constructor(view, model, appState) {
    super();
    this.view = view;
    this.model = model;
    this.appState = appState;
  }

  load(cb) {
    this.view.render();
    // set player preferences
    this.initPlayerPreferences(() => {
      this.appState.setPage(PAGE.GAME);
      cb();
    });
  }

  initPlayerPreferences(cb) {
    this.promptPlayerType(type => {
      this.promptColor(color => {
        // ask difficulty level if the opponent is a computer
        if (type === PLAYER_TYPE.COMPUTER) {
          this.promptDifficulty(difficulty => {
            this.preparePlayers(type, color, difficulty);
            cb();
          });
        } else {
          this.preparePlayers(type, color);
          cb();
        }
      });
    });
  }

  promptPlayerType(callback) {
    const rl = getReadlineInterface();
    const question = STRINGS.CHOOSE_PLAYER_TYPE;
    rl.question(question, answer => {
      let type = PLAYER_TYPE.COMPUTER;
      if (answer === CONFIRM.NO) {
        type = PLAYER_TYPE.HUMAN;
      }
      rl.close();
      callback(type);
    });
  }

  promptColor(callback) {
    const rl = getReadlineInterface();
    const question = STRINGS.CHOOSE_COLOR;
    rl.question(question, answer => {
      let color = COLOR.BLUE;
      if (answer.toUpperCase() === COLOR.RED) {
        color = COLOR.RED;
      }
      rl.close();
      callback(color);
    });
  }

  promptDifficulty(callback) {
    const rl = getReadlineInterface();
    const difficultyArr = Object.keys(DIFFICULTY);
    const question = STRINGS.CHOOSE_LEVEL.replace(
      "{0}",
      `(${difficultyArr.map(diff => diff).join(",")})`
    );
    rl.question(question, answer => {
      rl.close();
      callback(answer);
    });
  }

  // TODO: We can optimize this method to accomodate with more than two players
  // TODO: User can be prompted to select the opponent from the list.
  preparePlayers(type, color, difficulty = null) {
    const playerType = PLAYER_TYPE.HUMAN;
    const playerColor = color || COLOR.BLUE;
    const playerID = playerColor === COLOR.BLUE ? PLAYER_ID.B : PLAYER_ID.R;

    const opponentType = type;
    const opponentColor = color === COLOR.BLUE ? COLOR.RED : COLOR.BLUE;
    const opponentID = playerID === PLAYER_ID.B ? PLAYER_ID.R : PLAYER_ID.B;

    const firstPlayer = new PlayerModel(playerColor, playerType, playerID);

    const secondPlayer = new PlayerModel(
      opponentColor,
      opponentType,
      opponentID
    );
    this.appState.setPlayers([firstPlayer, secondPlayer]);

    // first player should start the game
    this.appState.setTurn(firstPlayer);

    // set computer player difficulty level
    if (difficulty) {
      if (DIFFICULTY.hasOwnProperty(difficulty)) {
        this.appState.setDifficulty(difficulty);
      } else {
        this.appState.setDifficulty(DIFFICULTY[1]);
      }
    }
  }
}

export default MenuController;
