import blackLogo from "../../assets/black-pawn.png";
import whiteLogo from "../../assets/white-pawn.png";

import { FigureModel, FigureNames } from "@models/FigureModel";
import { Colors } from "@utils/Colors";


export class Pawn extends FigureModel {
    public name = FigureNames.PAWN;
    public logo = this.color === Colors.WHITE ? whiteLogo : blackLogo;
}
