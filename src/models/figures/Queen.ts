import blackLogo from "../../assets/black-queen.png";
import whiteLogo from "../../assets/white-queen.png";

import { FigureModel, FigureNames } from "@models/index";
import { Colors } from "@utils/Colors";

export class Queen extends FigureModel {
    name = FigureNames.QUEEN;
    logo = this.color === Colors.WHITE ? whiteLogo : blackLogo;
}
