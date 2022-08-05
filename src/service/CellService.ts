import { BoardModel, CellModel, GameModel } from "@models/index";
import { FigureService } from "@service/index";


/**
 * Logic for working with cells
 */
export class CellService {
    private figureService: FigureService | null = null;

    constructor(
        private readonly gameModel: GameModel,
        private readonly boardModel: BoardModel
    ) {}

    public initFigureService(value: FigureService) {
        if (!this.figureService) {
            this.figureService = value;
        }
    }

    public isEmptyVertical(fromCell: CellModel, toCell: CellModel): boolean {
        if (fromCell.coords.x !== toCell.coords.x)
            return false;

        const min = Math.min(fromCell.coords.y, toCell.coords.y);
        const max = Math.max(fromCell.coords.y, toCell.coords.y);

        for (let y = min + 1; y < max; y++) {
            if (!this.boardModel.getOne(fromCell.coords.x, y).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    public isEmptyHorizontal(fromCell: CellModel, toCell: CellModel): boolean {
        if (fromCell.coords.y !== toCell.coords.y)
            return false;

        const min = Math.min(fromCell.coords.x, toCell.coords.x);
        const max = Math.max(fromCell.coords.x, toCell.coords.x);

        for (let x = min + 1; x < max; x++) {
            if (!this.boardModel.getOne(x, fromCell.coords.y).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    public isEmptyDiagonal(startCell: CellModel, endCell: CellModel) {
        const absX = Math.abs(startCell.coords.x - endCell.coords.x);
        const absY = Math.abs(startCell.coords.y - endCell.coords.y);

        if (absX !== absY) {
            return false;
        }

        const dx = startCell.coords.x < endCell.coords.x ? 1 : -1;
        const dy = startCell.coords.y < endCell.coords.y ? 1 : -1;

        for (let i = 1; i < absY; i++) {
            if (!this.boardModel.getOne(startCell.coords.x + dx * i, startCell.coords.y + dy * i).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    public highlightCells() {
        const selectedCell = this.boardModel.getSelectedCell();

        for (let i = 0; i < this.boardModel.getAll().length; i++) {
            const row = this.boardModel.getRow(i);

            for (let j = 0; j < row.length; j++) {
                const target = row[j];

                target.available = false;

                if (selectedCell) {
                    target.available = !!this.figureService?.canMove(selectedCell, target);
                }
            }
        }
    }

    public selectCell(cell: CellModel, onStep: (cellsBefore: CellModel[], cellsAfter: CellModel[]) => void) {
        const currentSelectedCell = this.boardModel.getSelectedCell();

        if (currentSelectedCell && currentSelectedCell !== cell) {
            const cellsBefore = JSON.parse(JSON.stringify(this.boardModel.getAll().flat()));

            this.figureService?.moveFigure(currentSelectedCell, cell);

            onStep(cellsBefore, this.boardModel.getAll().flat());

            this.boardModel.setSelectedCell(null);
        }

        this.boardModel.setSelectedCell(null);

        if (cell.figure !== null && cell.figure.color === this.gameModel.getTurn()) {
            this.boardModel.setSelectedCell(cell);
        }
    }
}
