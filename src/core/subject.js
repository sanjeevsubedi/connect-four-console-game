class Subject {
  constructor() {
    this.observers = [];
  }

  /**
   * register a new observer
   * @param {Observer} observer
   */
  addObserver(observer) {
    this.observers.push(observer);
  }
  /**
   * remove an observer
   * @param {Observer} observer
   */
  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  /**
   * notify all registered observers
   * @param {*} data
   */
  notifyObservers(data) {
    if (this.observers.length > 0) {
      this.observers.forEach(observer => observer.update(data));
    }
  }
}

export default Subject;
