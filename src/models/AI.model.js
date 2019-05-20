class AIModel {
  constructor(gameModel) {
    this.gameModel = gameModel;
    this._difficultyLevel = 1; // Default difficulty level
  }

  /**
   * returns the best move
   * TODO: optimize the algorithm to accomodate with different difficulty level
   * @param {int} difficultyLevel difficulty level
   * @return integer
   */

  findNextBestMove(difficultyLevel) {
    const level = difficultyLevel || this._difficultyLevel;
    const possibleCols = this.gameModel.findAllValidMoves();
    const bestMove = this.shuffle(possibleCols.slice());
    return bestMove;
  }

  /**
   * randomly shuffle an array
   * @param  {Array} array array to shuffle
   * @return {Integer} first item in the shuffled array
   */
  shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array[0];
  }
}
export default AIModel;
