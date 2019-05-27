import print from "../utils/print";
import { STRINGS } from "../constants/app.constant";
import BaseView from "../core/base.view";

class MenuView extends BaseView {
  constructor() {
    super();
  }

  render() {
    print("========================");
    print(STRINGS.GREETING);
    print("========================");
    print("");
  }
}

export default MenuView;
