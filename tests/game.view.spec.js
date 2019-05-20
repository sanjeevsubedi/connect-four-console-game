import print from "../src/utils/print";
import GameView from "../src/views/game.view";
import GameModel from "../src/models/game.model";
jest.mock("../src/utils/print");

describe("Game View", () => {
  let view;
  let model;
  beforeEach(() => {
    model = new GameModel();
    view = new GameView(model);
  });
  test("should exist", () => {
    expect(view instanceof GameView).not.toBeNull();
  });

  test("should render the game board", () => {
    jest.spyOn(view, "displayBoard").mockImplementation(() => {});
    view.render();
    expect(view.displayBoard).toHaveBeenCalled();
  });

  test("should render the game over view if there is a draw or win", () => {
    jest.spyOn(view, "displayBoard").mockImplementation(() => {});
    print.mockImplementation(() => {});
    view.displayGameOver();
    expect(print).toHaveBeenCalled();
  });
});
