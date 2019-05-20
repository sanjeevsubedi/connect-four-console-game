/**
 * Single source of truth of application state (Singleton)
 */

class AppState {
  constructor() {
    this._state = {
      page: null,
      turn: null,
      difficulty: null,
      players: [],
      gameResult: null
    };
  }

  /**
   * set the current page
   * @param {string} page
   */
  setPage(page) {
    this._state.page = page;
  }

  getPage() {
    return this._state.page;
  }

  /**
   * set the current player
   * @param {PlayerModel} turn
   */
  setTurn(turn) {
    this._state.turn = turn;
  }

  getTurn() {
    return this._state.turn;
  }

  /**
   * set the game level
   * @param {number} difficulty
   */
  setDifficulty(difficulty) {
    this._state.difficulty = difficulty;
  }

  getDifficulty() {
    return this._state.difficulty;
  }

  /**
   * set the game players
   * @param {Player[]} players
   */
  setPlayers(players) {
    this._state.players = players;
  }

  getPlayers() {
    return this._state.players;
  }

  /**
   * set the game result
   * @param {string} result
   */
  setGameResult(result) {
    this._state.gameResult = result;
  }

  getGameResult() {
    return this._state.gameResult;
  }

  getAllState() {
    return this._state;
  }
}

// create singleton
// const appState = new AppState();
// Object.freeze(appState);
export default AppState;
