import App from "./app";
import AppState from "./store/app.state";
import MenuView from "./views/menu.view";
import GameModel from "./models/game.model";
import GameView from "./views/game.view";
import AIModel from "./models/AI.model";
import GameController from "./controllers/game.controller";
import MenuController from "./controllers/menu.controller";

/** BootStrap App with clean slate */
(function() {
  const appState = new AppState();

  // prepare dependencies
  const menuView = new MenuView();
  const menu = new MenuController(menuView, null, appState);

  const gameModel = new GameModel();
  const gameView = new GameView(gameModel);
  const aIModel = new AIModel(gameModel);
  const game = new GameController(gameView, gameModel, appState, aIModel);

  // start the game
  const connectFour = new App(appState, menu, game);

  connectFour.init();
})();
