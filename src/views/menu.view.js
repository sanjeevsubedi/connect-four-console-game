import print from "../utils/print";
import { STRINGS } from "../constants/app.constant";

class MenuView {
  constructor() {}

  render() {
    print("========================");
    print(STRINGS.GREETING);
    print("========================");
    print("");
  }
}

export default MenuView;
