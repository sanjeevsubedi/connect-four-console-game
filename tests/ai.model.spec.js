import AIModel from "../src/models/AI.model";
import GameModel from "../src/models/game.model";
jest.mock("../src/models/game.model");

describe("AI Model", () => {
  let model;
  let gameModel;

  beforeEach(() => {
    gameModel = new GameModel();
    model = new AIModel(gameModel);
  });

  test("should exist", () => {
    expect(model instanceof AIModel).not.toBeNull();
  });

  describe("FindNextBestMove Function", () => {
    const validMoves = [1, 2];
    test("should find the best valid move", () => {
      jest
        .spyOn(gameModel, "findAllValidMoves")
        .mockImplementation(() => validMoves);

      jest.spyOn(model, "shuffle").mockImplementation(() => 1);
      const result = model.findNextBestMove();
      expect(gameModel.findAllValidMoves).toHaveBeenCalled();
      expect(model.shuffle).toHaveBeenCalledWith(validMoves);
      expect(result).toEqual(validMoves[0] || validMoves[1]);
    });
  });

  describe("Shuffle Function", () => {
    const validMoves = [1, 2];
    test("should shuffle among valid moves and return a single random move (dumb implementation)", () => {
      const validMoves = [1, 2];
      const result = model.shuffle(validMoves);
      expect(result).toEqual(validMoves[0] || validMoves[1]);
    });
  });
});
