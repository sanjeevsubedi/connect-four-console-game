import AppState from "../src/store/app.state";
import PlayerModel from "../src/models/player.model";
import { PAGE, DIFFICULTY, RESULT } from "../src/constants/app.constant";

describe("App State", () => {
  let state;
  beforeEach(() => {
    state = new AppState();
  });
  test("should exist", () => {
    expect(state instanceof AppState).not.toBeNull();
  });

  test("should set the current page", () => {
    state.setPage(PAGE.GAME);
    expect(state.getPage()).toEqual(PAGE.GAME);
  });

  test("should set the player turn", () => {
    const player = new PlayerModel(null, null, null);
    state.setTurn(player);
    expect(state.getTurn()).toEqual(player);
  });

  test("should set game difficulty", () => {
    state.setDifficulty(DIFFICULTY[1]);
    expect(state.getDifficulty()).toEqual(DIFFICULTY[1]);
  });

  test("should set game participants", () => {
    const playerOne = new PlayerModel(null, null, null);
    const playerTwo = new PlayerModel(null, null, null);
    state.setPlayers([playerOne, playerTwo]);
    expect(state.getPlayers()).toEqual([playerOne, playerTwo]);
  });

  test("should set game result", () => {
    state.setGameResult(RESULT.DRAW);
    expect(state.getGameResult()).toEqual(RESULT.DRAW);
  });
});
