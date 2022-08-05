import logo from "../assets/empty-image.png";
import { Colors } from "@utils/index";

export enum FigureNames {
    KING = 'King',
    KNIGHT = 'Knight',
    PAWN = 'Pawn',
    QUEEN = 'Queen',
    ROOK = 'Rook',
    BISHOP = 'Bishop'
}


/**
 * Base class for a figure. A spesific figure is created with a factory
 */
export abstract class FigureModel {
    public readonly id: number;
    public color: Colors
    public abstract logo: typeof logo;
    public abstract name: FigureNames;

    // for different logic
    hasMoved: boolean = false;

    constructor(id: number, color: Colors) {
        this.id = id;
        this.color = color;
    }
}
