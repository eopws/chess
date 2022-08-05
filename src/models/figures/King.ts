import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

import { FigureModel, FigureNames } from "@models/index";
import { Colors } from "@utils/Colors";

export class King extends FigureModel {
    name = FigureNames.KING;
    logo = this.color === Colors.WHITE ? whiteLogo : blackLogo;
}
