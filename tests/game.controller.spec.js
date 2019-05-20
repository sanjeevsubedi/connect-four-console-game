import GameController from "../src/controllers/game.controller";
import GameModel from "../src/models/game.model";
import PlayerModel from "../src/models/player.model";
import GameView from "../src/views/game.view";
import AppState from "../src/store/app.state";
import AIModel from "../src/models/AI.model";
import {
  PLAYER_TYPE,
  STRINGS,
  COLOR,
  PLAYER_ID,
  RESULT
} from "../src/constants/app.constant";
import BaseEvent from "../src/events/base.event";
jest.mock("../src/models/game.model");
jest.mock("../src/models/AI.model");
jest.mock("../src/views/game.view");
jest.mock("../src/store/app.state");
jest.mock("../src/events/base.event");

describe("Game Controller", () => {
  let controller;
  let view;
  let model;
  let appState;
  let aIModel;

  beforeEach(() => {
    model = new GameModel();
    view = new GameView(model);
    view.dropDiscEvent = new BaseEvent();
    appState = new AppState();
    aIModel = new AIModel(model);
    controller = new GameController(view, model, appState, aIModel);
  });

  test("should exist", () => {
    expect(controller instanceof GameController).not.toBeNull();
  });

  describe("Load function", () => {
    test("should render the view", () => {
      jest.spyOn(view, "render").mockImplementation(() => {});
      jest.spyOn(controller, "initiateMove").mockImplementation(() => {});
      controller.load();
      expect(view.render).toHaveBeenCalled();
    });

    test("should initiate player move", () => {
      jest.spyOn(controller, "initiateMove").mockImplementation(() => {});
      controller.load();
      expect(controller.initiateMove).toHaveBeenCalled();
    });
  });

  describe("InitiateMove function", () => {
    test("should trigger computer move if player type is computer", () => {
      jest.spyOn(appState, "getTurn").mockImplementation(() => {
        return new PlayerModel(null, PLAYER_TYPE.COMPUTER, null);
      });
      jest.spyOn(controller, "triggerAIMove").mockImplementation(() => {});
      controller.initiateMove();
      expect(controller.triggerAIMove).toHaveBeenCalled();
    });

    test("should prompt to drop the disc into their preferred column if player is human", () => {
      jest.spyOn(appState, "getTurn").mockImplementation(() => {
        return new PlayerModel(COLOR.BLUE, PLAYER_TYPE.HUMAN, null);
      });
      jest.spyOn(model, "findAllValidMoves").mockImplementation(() => {
        return [1, 2, 3];
      });

      jest.spyOn(controller, "dropDisc").mockImplementation(() => {});

      let promptCallback = Function;
      jest
        .spyOn(controller, "promptUserMove")
        .mockImplementation((question, cb) => {
          promptCallback = cb;
        });
      controller.initiateMove();

      const validMoves = model.findAllValidMoves().join(",");
      const validMovesInfo = STRINGS.VALID_COLUMN.replace("{0}", validMoves);
      const question = validMovesInfo.replace("{1}", appState.getTurn().color);

      expect(controller.promptUserMove).toHaveBeenCalledWith(
        question,
        promptCallback
      );

      // trigger prompt callback
      const userSelectedColumn = 1;
      promptCallback(userSelectedColumn);

      expect(controller.dropDisc).toHaveBeenCalledWith(userSelectedColumn);
    });
  });

  describe("DropDisc function", () => {
    function createBoard(rows, cols, emptyDisc) {
      let board = [];
      for (let y = 0; y < rows; y++) {
        board[y] = [];
        for (let x = 0; x < cols; x++) {
          board[y][x] = emptyDisc;
        }
      }
      return board;
    }
    let board;
    let currentPlayer;
    let rows = 6;
    let cols = 7;
    let emptyDisc = "o";
    beforeEach(() => {
      board = createBoard(rows, cols, emptyDisc);
      currentPlayer = new PlayerModel(COLOR.RED, null, PLAYER_ID.R);
      jest.spyOn(appState, "getTurn").mockImplementation(() => {
        return currentPlayer;
      });
      jest.spyOn(model, "getBoard").mockImplementation(() => board);
      jest.spyOn(model, "getRows").mockImplementation(() => 6);
      jest.spyOn(model, "getEmptyDisc").mockImplementation(() => "o");
      jest.spyOn(model, "setBoard").mockImplementation(() => {});
      jest.spyOn(controller, "switchPlayer").mockImplementation(() => {});
      jest.spyOn(controller, "initiateMove").mockImplementation(() => {});
    });

    test("should recreate the game board when a new disc is dropped", () => {
      const columnToDrop = 7;
      controller.dropDisc(columnToDrop);
      expect(model.setBoard).toHaveBeenCalledWith(board);
    });

    test("should switch players when a new disc is dropped", () => {
      const columnToDrop = 7;
      controller.dropDisc(columnToDrop);
      expect(controller.switchPlayer).toHaveBeenCalledWith(currentPlayer);
    });

    test("should show the draw outcome if the board is full without a win from any player", () => {
      const columnToDrop = 7;
      jest.spyOn(model, "findGameResult").mockImplementation(() => RESULT.DRAW);
      controller.dropDisc(columnToDrop);
      expect(model.findGameResult).toHaveBeenCalled();
    });

    test("should show the win outcome if red player wins a game", () => {
      const columnToDrop = 7;
      // mocking to represent red player has already put three consecutive disc in vertical sequrence
      const board = createBoard(rows, cols, emptyDisc);
      board[0][6] = PLAYER_ID.R;
      board[1][6] = PLAYER_ID.R;
      board[2][6] = PLAYER_ID.R;

      jest.spyOn(model, "getBoard").mockImplementation(() => board);

      jest
        .spyOn(model, "findGameResult")
        .mockImplementation(() => RESULT.RED_WIN);

      controller.dropDisc(columnToDrop);
      expect(model.findGameResult).toHaveBeenCalledWith(
        board,
        3,
        columnToDrop - 1,
        currentPlayer
      );
    });

    test("should show the win outcome if blue player wins a game", () => {
      const columnToDrop = 7;
      // mocking to represent blue player has already put three consecutive disc in vertical sequrence
      const board = createBoard(rows, cols, emptyDisc);
      const currentPlayer = new PlayerModel(COLOR.BLUE, null, PLAYER_ID.B);

      board[0][6] = PLAYER_ID.B;
      board[1][6] = PLAYER_ID.B;
      board[2][6] = PLAYER_ID.B;

      jest.spyOn(appState, "getTurn").mockImplementation(() => {
        return currentPlayer;
      });

      jest.spyOn(model, "getBoard").mockImplementation(() => board);

      jest
        .spyOn(model, "findGameResult")
        .mockImplementation(() => RESULT.BLUE_WIN);

      controller.dropDisc(columnToDrop);
      expect(model.findGameResult).toHaveBeenCalledWith(
        board,
        3,
        columnToDrop - 1,
        currentPlayer
      );
    });
  });

  describe("SwitchPlayer function", () => {
    test("should switch players", () => {
      const currentPlayer = new PlayerModel(
        COLOR.RED,
        PLAYER_TYPE.HUMAN,
        PLAYER_ID.R
      );
      const nextPlayer = new PlayerModel(
        COLOR.BLUE,
        PLAYER_TYPE.COMPUTER,
        PLAYER_ID.HUMAN
      );

      const players = [currentPlayer, nextPlayer];

      jest.spyOn(appState, "getPlayers").mockImplementation(() => {
        return players;
      });
      jest.spyOn(controller, "initiateMove").mockImplementation(() => {});
      controller.switchPlayer(currentPlayer);
      expect(appState.setTurn).toHaveBeenCalledWith(nextPlayer);
      expect(controller.initiateMove).toHaveBeenCalled();
    });
  });

  describe("TriggerAIMove function", () => {
    test("should use AI to find the best move", () => {
      const difficulty = 1;
      const bestMove = 1;
      jest.spyOn(controller, "dropDisc").mockImplementation(() => {});
      jest
        .spyOn(appState, "getDifficulty")
        .mockImplementation(() => difficulty);
      jest
        .spyOn(aIModel, "findNextBestMove")
        .mockImplementation(() => bestMove);

      controller.triggerAIMove();
      expect(aIModel.findNextBestMove).toHaveBeenCalledWith(difficulty);
      expect(appState.getDifficulty).toHaveBeenCalled();
    });

    test("should drop the disc after finding the best move", () => {
      const bestMove = 1;
      jest
        .spyOn(aIModel, "findNextBestMove")
        .mockImplementation(() => bestMove);
      jest.spyOn(controller, "dropDisc").mockImplementation(() => {});
      controller.triggerAIMove();
      expect(controller.dropDisc).toHaveBeenCalledWith(bestMove);
    });
  });
});
