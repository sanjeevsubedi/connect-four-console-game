import MenuView from "../src/views/menu.view";
import MenuController from "../src/controllers/menu.controller";
import AppState from "../src/store/app.state";
import {
  PAGE,
  PLAYER_TYPE,
  COLOR,
  DIFFICULTY
} from "../src/constants/app.constant";
jest.mock("../src/store/app.state");
jest.mock("../src/views/menu.view");

describe("Menu Controller", () => {
  let controller;
  let view;
  let appState;

  beforeEach(() => {
    view = new MenuView();
    appState = new AppState();
    controller = new MenuController(view, null, appState);
  });

  test("should exist", () => {
    expect(controller instanceof MenuController).not.toBeNull();
  });

  describe("Load Function", () => {
    test("should render the menu view", () => {
      jest.spyOn(view, "render").mockImplementation(() => {});
      jest
        .spyOn(controller, "initPlayerPreferences")
        .mockImplementation(cb => {});
      controller.load();
      expect(view.render).toHaveBeenCalled();
    });

    test("should prompt for player preferences and load the game after setting them", () => {
      jest.spyOn(view, "render").mockImplementation(() => {});
      jest.spyOn(appState, "setPage").mockImplementation(() => {});

      let preferencesLockedCallback = Function;

      jest.spyOn(controller, "initPlayerPreferences").mockImplementation(cb => {
        preferencesLockedCallback = cb;
      });
      controller.load(preferencesLockedCallback);

      expect(controller.initPlayerPreferences).toHaveBeenCalled();

      // trigger completion of setting player preferences
      preferencesLockedCallback();

      expect(appState.setPage).toHaveBeenCalledWith(PAGE.GAME);
    });
  });

  describe("InitPlayerPreferences Function", () => {
    let initPlayerPreferencesCb;
    let promptColorCb;
    let promptPlayerTypeCb;
    let selectedColor;
    let selectedOpponentType;
    beforeEach(() => {
      selectedOpponentType = PLAYER_TYPE.HUMAN;
      selectedColor = COLOR.RED;
      promptPlayerTypeCb = Function;
      promptColorCb = Function;
      initPlayerPreferencesCb = jest.fn();
      jest.spyOn(controller, "promptPlayerType").mockImplementation(cb => {
        promptPlayerTypeCb = cb;
      });
      jest.spyOn(controller, "promptColor").mockImplementation(cb => {
        promptColorCb = cb;
      });
    });

    test("should prompt player type", () => {
      controller.initPlayerPreferences(initPlayerPreferencesCb);
      expect(controller.promptPlayerType).toHaveBeenCalledWith(
        promptPlayerTypeCb
      );
    });

    test("should prompt color", () => {
      controller.initPlayerPreferences(initPlayerPreferencesCb);
      // prompt player type selection completion
      promptPlayerTypeCb(selectedOpponentType);
      expect(controller.promptColor).toHaveBeenCalledWith(promptColorCb);
    });

    test("should prompt difficulty level if opponent is a computer player", () => {
      let promptDifficultyCb = Function;
      jest.spyOn(controller, "promptDifficulty").mockImplementation(cb => {
        promptDifficultyCb = cb;
      });
      jest.spyOn(controller, "preparePlayers").mockImplementation(() => {});

      selectedOpponentType = PLAYER_TYPE.COMPUTER;
      controller.initPlayerPreferences(initPlayerPreferencesCb);
      // prompt player type selection completion
      promptPlayerTypeCb(selectedOpponentType);

      // prompt color selection completion
      promptColorCb(selectedColor);

      expect(controller.promptDifficulty).toHaveBeenCalledWith(
        promptDifficultyCb
      );

      // prompt difficulty level selection completion
      promptDifficultyCb(DIFFICULTY[1]);

      expect(controller.preparePlayers).toHaveBeenCalledWith(
        selectedOpponentType,
        selectedColor,
        DIFFICULTY[1]
      );
      // completion of selection of color, player type, difficulty level and preparing player for the game
      expect(initPlayerPreferencesCb).toHaveBeenCalled();
    });

    test("should prepare players after selection of color and player type", () => {
      jest.spyOn(controller, "preparePlayers").mockImplementation(() => {});
      controller.initPlayerPreferences(initPlayerPreferencesCb);
      // prompt player type selection completion
      promptPlayerTypeCb(selectedOpponentType);

      // prompt color selection completion
      promptColorCb(selectedColor);

      expect(controller.preparePlayers).toHaveBeenCalledWith(
        selectedOpponentType,
        selectedColor
      );
      // completion of selection of color, player type and preparing player for the game
      expect(initPlayerPreferencesCb).toHaveBeenCalled();
    });
  });
});
