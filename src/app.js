import { PAGE } from "./constants/app.constant";

class App {
  constructor(appState, menu, game) {
    this.appState = appState;
    this.menu = menu;
    this.game = game;
  }

  init() {
    // set menu to be the firt screen to show
    this.appState.setPage(PAGE.MENU);

    // handle page routing
    this.pageManager();
  }

  pageManager() {
    if (this.appState.getPage() === PAGE.MENU) {
      this.menu.load(() => {
        this.pageManager();
      });
    } else {
      this.game.load();
    }
  }
}

export default App;
