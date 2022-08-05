import blackLogo from "../../assets/black-bishop.png";
import whiteLogo from "../../assets/white-bishop.png";

import { FigureModel, FigureNames } from "@models/index";
import { Colors } from "@utils/Colors";

export class Bishop extends FigureModel {
    name = FigureNames.BISHOP;
    logo = this.color === Colors.WHITE ? whiteLogo : blackLogo;
}
