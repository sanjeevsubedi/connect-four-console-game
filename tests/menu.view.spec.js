import MenuView from "../src/views/menu.view";
import print from "../src/utils/print";
jest.mock("../src/utils/print");

describe("Menu View", () => {
  let view;
  beforeEach(() => {
    view = new MenuView();
  });
  test("should exist", () => {
    expect(view instanceof MenuView).not.toBeNull();
  });

  test("should render the main menu", () => {
    print.mockImplementation(() => {});
    view.render();
    expect(print).toHaveBeenCalled();
  });
});
