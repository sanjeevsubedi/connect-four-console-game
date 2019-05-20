import PlayerModel from "../src/models/player.model";
import { COLOR, PLAYER_TYPE, PLAYER_ID } from "../src/constants/app.constant";

describe("Player Model", () => {
  let model;
  beforeEach(() => {
    model = new PlayerModel();
  });
  test("should exist", () => {
    expect(model instanceof PlayerModel).not.toBeNull();
  });

  test("should set the color of the player", () => {
    model.setColor(COLOR.BLUE);
    expect(model.getColor()).toEqual(COLOR.BLUE);
  });

  test("should set the type of the player", () => {
    model.setType(PLAYER_TYPE.HUMAN);
    expect(model.getType()).toEqual(PLAYER_TYPE.HUMAN);
  });

  test("should set the id of the player", () => {
    model.setId(PLAYER_ID.R);
    expect(model.getId()).toEqual(PLAYER_ID.R);
  });
});
