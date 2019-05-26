import Observer from "./observer";

/**
 * Base view
 */
class BaseView extends Observer {
  constructor() {
    super();
  }

  // TODO: make it abstract when Typescript support is added
  render() {}

  // TODO: make it abstract when Typescript support is added
  update() {}
}

export default BaseView;
