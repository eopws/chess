import { Colors } from "@utils/index";
import { FigureModel } from "@models/index";


interface ICoords {
    readonly x: number;
    readonly y: number;
}


/**
 * Stores a single cell info (coords, color etc.) and provides methods for receiving it
 */
export class CellModel {
    readonly color: Colors;
    readonly coords: ICoords;
    available: boolean;
    figure: FigureModel | null;

    constructor(color: Colors, x: number, y: number) {
        this.color = color;
        this.coords = {x, y};
        this.available = false;
        this.figure = null;
    }

    public setFigure(figure: FigureModel | null) {
        this.figure = figure;
    }

    public isEmpty(): boolean {
        return this.figure === null;
    }

    public compare(cell: CellModel): boolean {
        return (this.coords.x === cell.coords.x) && (this.coords.y === cell.coords.y);
    }
}
