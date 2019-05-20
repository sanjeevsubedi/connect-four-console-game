class PlayerModel {
  constructor(color, type, id) {
    this.color = color;
    this.type = type;
    this.id = id;
  }

  /**
   * set the color of player
   * @param {string} color
   */
  setColor(color) {
    this.color = color;
  }

  /**
   * set the type of player
   * @param {string} color
   */
  setType(type) {
    this.type = type;
  }

  /**
   * set the id of player
   * @param {string} color
   */
  setId(id) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  getColor() {
    return this.color;
  }

  getType() {
    return this.type;
  }
}
export default PlayerModel;
