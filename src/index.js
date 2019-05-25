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
  // lib such as https://github.com/gedbac/di4js could be used to resolve dependencies
  const menuView = new MenuView();
  const menu = new MenuController(menuView, null, appState);

  const gameModel = new GameModel();
  const gameView = new GameView(gameModel);

  // add view as an observer to get notified about changes in the model
  gameModel.addObserver(gameView);

  const aIModel = new AIModel(gameModel);
  const game = new GameController(gameView, gameModel, appState, aIModel);

  // start the game
  const connectFour = new App(appState, menu, game);

  connectFour.init();
})();
