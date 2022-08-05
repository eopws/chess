import blackLogo from "../../assets/black-rook.png";
import whiteLogo from "../../assets/white-rook.png";

import { FigureModel, FigureNames } from "@models/index";
import { Colors } from "@utils/Colors";


export class Rook extends FigureModel {
    name = FigureNames.ROOK;
    logo = this.color === Colors.WHITE ? whiteLogo : blackLogo;
}
