import { BoardModel, CellModel } from "@models/index";
import { CellService } from "@service/index";


/**
 * Provides cells data and process input
 */
export class CellController {
    constructor(
        private readonly boardModel: BoardModel,
        private readonly cellService: CellService
    ) {}

    public getCellsAction(): CellModel[] {
        if (!this.boardModel.getAll().length) {
            return [];
        }

        this.cellService.highlightCells();

        return this.boardModel.getAll().flat();
    }

    public selectCellAction(x: number, y: number, onStep: (cellsBefore: CellModel[], cellsAfter: CellModel[]) => void): CellModel | null {
        const cell = this.boardModel.getOne(x, y);

        this.cellService.selectCell(cell, onStep);

        return this.boardModel.getSelectedCell();
    }
}
