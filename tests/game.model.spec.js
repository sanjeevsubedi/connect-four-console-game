import GameModel from "../src/models/game.model";
import {
  COLUMN,
  PLAYER_ID,
  COLOR,
  PLAYER_TYPE,
  RESULT
} from "../src/constants/app.constant";
import BaseEvent from "../src/events/base.event";
import PlayerModel from "../src/models/player.model";
jest.mock("../src/events/base.event");

describe("Game Model", () => {
  let model;
  beforeEach(() => {
    model = new GameModel();
    BaseEvent.mockClear();
  });

  test("should exist", () => {
    expect(model instanceof GameModel).not.toBeNull();
  });

  it("should create recreate board and game over events", () => {
    model = new GameModel();
    expect(BaseEvent).toHaveBeenCalledTimes(2); // one for recreate and another for game over event
  });

  test("should create a new empty game board", () => {
    const board = model.getBoard();
    expect(board).not.toBeNull();
  });

  describe("IsValidMove Function", () => {
    test("should test for full column", () => {
      const board = model.createBoard(
        model.getRows(),
        model.getCols(),
        model.getEmptyDisc()
      );
      board[0][6] = PLAYER_ID.R;
      board[1][6] = PLAYER_ID.R;
      board[2][6] = PLAYER_ID.R;
      board[3][6] = PLAYER_ID.R;
      board[4][6] = PLAYER_ID.R;
      board[5][6] = PLAYER_ID.R;
      model.setBoard(board);

      const column = 7; // last column
      const result = model.isValidMove(column);
      expect(result).toBe(COLUMN.FULL);
    });

    test("should test for invalid column which are non numeric and out of range (col < 0 || col > 7) )", () => {
      const inValidcolumn = "=";
      const result = model.isValidMove(inValidcolumn);
      expect(result).toBe(COLUMN.INVALID);
    });
  });

  describe("ConnectFour Function", () => {
    test("should check connection vertically", () => {
      const board = model.createBoard(
        model.getRows(),
        model.getCols(),
        model.getEmptyDisc()
      );
      // vertical match mock
      board[0][6] = PLAYER_ID.R;
      board[1][6] = PLAYER_ID.R;
      board[2][6] = PLAYER_ID.R;
      board[3][6] = PLAYER_ID.R;

      const winningRow = 3;
      const winningCol = 6;
      const player = new PlayerModel(COLOR.RED, PLAYER_TYPE.HUMAN, PLAYER_ID.R);

      const result = model.connectFour(
        board,
        winningRow,
        winningCol,
        player.id
      );
      expect(result).toBeTruthy();
    });

    test("should check connection horizontally", () => {
      const board = model.createBoard(
        model.getRows(),
        model.getCols(),
        model.getEmptyDisc()
      );
      // horizontal match mock
      board[0][0] = PLAYER_ID.R;
      board[0][1] = PLAYER_ID.R;
      board[0][2] = PLAYER_ID.R;
      board[0][3] = PLAYER_ID.R;

      const winningRow = 0;
      const winningCol = 3;
      const player = new PlayerModel(COLOR.RED, PLAYER_TYPE.HUMAN, PLAYER_ID.R);

      const result = model.connectFour(
        board,
        winningRow,
        winningCol,
        player.id
      );
      expect(result).toBeTruthy();
    });

    test("should check connection diagonally in right direction (/)", () => {
      const board = model.createBoard(
        model.getRows(),
        model.getCols(),
        model.getEmptyDisc()
      );

      // Diagonal in the right direction

      // first row
      board[0][0] = PLAYER_ID.R;
      board[1][1] = PLAYER_ID.R;
      board[2][2] = PLAYER_ID.R;
      board[3][3] = PLAYER_ID.R;

      // board[0][1] = PLAYER_ID.R;
      // board[1][2] = PLAYER_ID.R;
      // board[2][3] = PLAYER_ID.R;
      // board[3][4] = PLAYER_ID.R;

      // board[0][2] = PLAYER_ID.R;
      // board[1][3] = PLAYER_ID.R;
      // board[2][4] = PLAYER_ID.R;
      // board[3][5] = PLAYER_ID.R;

      // board[0][3] = PLAYER_ID.R;
      // board[1][4] = PLAYER_ID.R;
      // board[2][5] = PLAYER_ID.R;
      // board[3][6] = PLAYER_ID.R;

      // Second Row
      // board[1][0] = PLAYER_ID.R;
      // board[2][1] = PLAYER_ID.R;
      // board[3][2] = PLAYER_ID.R;
      // board[4][3] = PLAYER_ID.R;

      // Third Row
      // board[2][0] = PLAYER_ID.R;
      // board[3][1] = PLAYER_ID.R;
      // board[4][2] = PLAYER_ID.R;
      // board[5][3] = PLAYER_ID.R;

      // board[2][3] = PLAYER_ID.R;
      // board[3][4] = PLAYER_ID.R;
      // board[4][5] = PLAYER_ID.R;
      // board[5][6] = PLAYER_ID.R;

      const winningRow = 3;
      const winningCol = 6;
      const player = new PlayerModel(COLOR.RED, PLAYER_TYPE.HUMAN, PLAYER_ID.R);

      const result = model.connectFour(
        board,
        winningRow,
        winningCol,
        player.id
      );
      expect(result).toBeTruthy();
    });

    test("should check connection diagonally in left direction", () => {
      const board = model.createBoard(
        model.getRows(),
        model.getCols(),
        model.getEmptyDisc()
      );

      // Diagonal in the left direction
      board[0][6] = PLAYER_ID.R;
      board[1][5] = PLAYER_ID.R;
      board[2][4] = PLAYER_ID.R;
      board[3][3] = PLAYER_ID.R;

      // board[2][3] = PLAYER_ID.R;
      // board[3][2] = PLAYER_ID.R;
      // board[4][1] = PLAYER_ID.R;
      // board[5][0] = PLAYER_ID.R;

      const winningRow = 3;
      const winningCol = 6;
      const player = new PlayerModel(COLOR.RED, PLAYER_TYPE.HUMAN, PLAYER_ID.R);

      const result = model.connectFour(
        board,
        winningRow,
        winningCol,
        player.id
      );
      expect(result).toBeTruthy();
    });
  });

  describe("IsFull Function", () => {
    test("should test whether all disc slots have been occupied", () => {
      const board = model.createBoard(
        model.getRows(),
        model.getCols(),
        model.getEmptyDisc()
      );
      // fill all the slots of board
      for (let r = model.getRows() - 1; r >= 0; r--) {
        for (let c = 0; c < model.getCols(); c++) {
          board[r][c] = PLAYER_ID.R;
        }
      }
      model.setBoard(board);
      const result = model.isFull();
      expect(result).toBeTruthy();
    });
  });

  describe("SetBoard Function", () => {
    test("should set the board and call recreate board event to notify listening views", () => {
      const board = model.createBoard(
        model.getRows(),
        model.getCols(),
        model.getEmptyDisc()
      );
      jest
        .spyOn(model.recreateBoardEvent, "notify")
        .mockImplementation(() => {});

      model.setBoard(board);
      expect(model.recreateBoardEvent.notify).toHaveBeenCalled();
    });
  });

  describe("FindGameResult Function", () => {
    test("should call a helper function to check if the board is fully occupied and notify the view", () => {
      jest.spyOn(model, "isFull").mockImplementation(() => true);
      jest.spyOn(model.gameOverEvent, "notify").mockImplementation(() => {});
      model.findGameResult(null, null, null, null);
      expect(model.isFull).toHaveBeenCalled();
      expect(model.gameOverEvent.notify).toHaveBeenCalledWith(RESULT.DRAW);
    });

    test("should call a helper function to check if a player wins and notify the view ", () => {
      const player = new PlayerModel(COLOR.RED, null, PLAYER_ID.R);
      jest.spyOn(model, "isFull").mockImplementation(() => false);
      jest.spyOn(model, "connectFour").mockImplementation(() => true);
      model.findGameResult(null, null, null, player);
      expect(model.connectFour).toHaveBeenCalledWith(
        null,
        null,
        null,
        player.id
      );
      expect(model.gameOverEvent.notify).toHaveBeenCalledWith(RESULT.RED_WIN);
    });
  });

  describe("FindAllValidMoves Function", () => {
    test("should find (1-6) as valid columns if the last column (7) is full", () => {
      const board = model.createBoard(
        model.getRows(),
        model.getCols(),
        model.getEmptyDisc()
      );
      // mock the last column to be full
      board[0][6] = PLAYER_ID.R;
      board[1][6] = PLAYER_ID.R;
      board[2][6] = PLAYER_ID.R;
      board[3][6] = PLAYER_ID.R;
      board[4][6] = PLAYER_ID.R;
      board[5][6] = PLAYER_ID.R;

      model.setBoard(board);
      const result = model.findAllValidMoves();
      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
