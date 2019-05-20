import App from "../src/app";
import AppState from "../src/store/app.state";
import { PAGE } from "../src/constants/app.constant";
import MenuController from "../src/controllers/menu.controller";
import MenuView from "../src/views/menu.view";
import GameModel from "../src/models/game.model";
import GameView from "../src/views/game.view";
import GameController from "../src/controllers/game.controller";
import AIModel from "../src/models/AI.model";
jest.mock("../src/store/app.state");
jest.mock("../src/views/menu.view");
jest.mock("../src/views/game.view");
jest.mock("../src/models/game.model");
jest.mock("../src/models/AI.model");
jest.mock("../src/controllers/menu.controller");
jest.mock("../src/controllers/game.controller");

describe("Connect Four App", () => {
  let app;
  let appState;
  let menu;
  let game;

  beforeEach(() => {
    appState = new AppState();

    const menuView = new MenuView();
    menu = new MenuController(menuView, null, appState);

    const gameModel = new GameModel();
    const gameView = new GameView(gameModel);
    const aIModel = new AIModel(gameModel);
    game = new GameController(gameView, gameModel, appState, aIModel);

    app = new App(appState, menu, game);
  });

  test("should exist", () => {
    expect(app instanceof App).not.toBeNull();
  });

  describe("Init Function", () => {
    test("should set main menu as the first screen of the app", () => {
      jest.spyOn(appState, "setPage").mockImplementation(() => {});
      jest.spyOn(app, "pageManager").mockImplementation(() => {});
      app.init();
      expect(appState.setPage).toHaveBeenCalledWith(PAGE.MENU);
    });

    test("should call page manager to route to the correct screen", () => {
      jest.spyOn(app, "pageManager").mockImplementation(() => {});
      app.init();
      expect(app.pageManager).toHaveBeenCalled();
    });
  });

  describe("PageManager Function", () => {
    test("should redirect to menu screen for the first time", () => {
      jest.spyOn(appState, "getPage").mockImplementation(() => PAGE.MENU);

      let menuLoadCallback = Function;
      jest.spyOn(menu, "load").mockImplementation(cb => {
        menuLoadCallback = cb;
      });

      app.pageManager();

      expect(menu.load).toHaveBeenCalled();

      jest.spyOn(app, "pageManager").mockImplementation(() => {});
      // trigger callback and this will load the game screen
      menuLoadCallback();
      expect(app.pageManager).toHaveBeenCalled();
    });
  });

  describe("PageManager Function", () => {
    test("should load game after player preferences has been set from the main menu", () => {
      jest.spyOn(appState, "getPage").mockImplementation(() => PAGE.GAME);
      jest.spyOn(game, "load").mockImplementation(() => {});

      app.pageManager();

      expect(game.load).toHaveBeenCalled();
    });
  });
});
