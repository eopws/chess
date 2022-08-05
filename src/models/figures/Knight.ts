import blackLogo from "../../assets/black-knight.png";
import whiteLogo from "../../assets/white-knight.png";

import { FigureModel, FigureNames } from "@models/index";
import { Colors } from "@utils/Colors";


export class Knight extends FigureModel {
    name = FigureNames.KNIGHT;
    logo = this.color === Colors.WHITE ? whiteLogo : blackLogo;
}
