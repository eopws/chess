import { CellModel } from "@models/index";


/**
 * Stores cells and provides methods for receiving them
 */
export class BoardModel {
    private cells: CellModel[/* rows */][/* cells */] = [];
    private selectedCell: CellModel | null = null;

    public addCell(cell: CellModel): void {
        while (!this.cells[cell.coords.y]) {
            this.cells.push([]);
        }

        this.cells[cell.coords.y][cell.coords.x] = cell;
    }

    public getOne(x: number, y: number): CellModel | never {
        try {
            return this.cells[y][x];
        } catch(e) {
            throw new Error('The cell was not found');
        }
    }

    public getRow(y: number): CellModel[] {
        return this.cells[y];
    }

    public getAll(): CellModel[][] {
        return this.cells;
    }

    public getSelectedCell(): CellModel | null {
        return this.selectedCell;
    }

    public setSelectedCell(cell: CellModel | null) {
        this.selectedCell = cell;
    }

    public removeAllCells() {
        this.cells = [];
    }
}
