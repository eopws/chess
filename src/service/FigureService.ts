import { BoardModel, CellModel, FigureNames, GameModel } from "@models/index";
import { Colors } from "@utils/index";
import { CellService } from "@service/index";


/**
 * Logic for working with figures
 */
export class FigureService {
    private cellService: CellService | null = null;

    constructor(
        private readonly gameModel: GameModel,
        private readonly boardModel: BoardModel
    ) {}

    public initCellService(value: CellService) {
        if (!this.cellService) {
            this.cellService = value;
        }
    }

    public isKingInCheck(kingColor: Colors): boolean {
        let kingCell;

        for (const cell of this.boardModel.getAll().flat()) {
            if (cell.figure?.name === FigureNames.KING && cell.figure.color === kingColor) {
                kingCell = cell;
                break;
            }
        }

        if (!kingCell)
            return false;

        for (const cell of this.boardModel.getAll().flat()) {
            if (cell !== kingCell && this.canMove(cell, kingCell, false)) {
                return true;
            }
        }

        return false;
    }

    public isKingInCheckMate(kingColor: Colors): boolean {
        if (!this.isKingInCheck(kingColor))
            return false;

        const cells = this.boardModel.getAll().flat();

        for (let i = 0; i < cells.length; i++) {
            const cellTo = cells[i];

            for (let j = 0; j < cells.length; j++) {
                const cellFrom = cells[j];

                if (!cellFrom.figure || cellFrom.figure.color !== kingColor)
                    continue;

                if (this.canMove(cellFrom, cellTo)) {
                    return false;
                }
            }
        }

        return true;
    }

    private shortCastleFigures(fromCell: CellModel, toCell: CellModel) {
        const y = fromCell.coords.y;

        this.boardModel.getOne(fromCell.coords.x + 2, y).figure = fromCell.figure;
        const rook = this.boardModel.getOne(fromCell.coords.x + 3, y).figure;
        this.boardModel.getOne(fromCell.coords.x + 1, y).figure = rook;

        fromCell.figure = null;
        this.boardModel.getOne(fromCell.coords.x + 3, y).figure = null;
    }

    private longCastleFigures(fromCell: CellModel, toCell: CellModel) {
        const y = fromCell.coords.y;

        this.boardModel.getOne(2, y).figure = fromCell.figure;
        const rook = this.boardModel.getOne(0, y).figure;
        this.boardModel.getOne(3, y).figure = rook;

        fromCell.figure = null;
        this.boardModel.getOne(0, y).figure = null;
    }

    public moveFigure(fromCell: CellModel, toCell: CellModel) {
        if (this.canMove(fromCell, toCell) && fromCell.figure) {
            fromCell.figure.hasMoved = true;
            this.gameModel.toggleTurn();

            if ((toCell.coords.x - fromCell.coords.x === 2) && (toCell.coords.y === fromCell.coords.y) && fromCell.figure.name === FigureNames.KING) {
                this.shortCastleFigures(fromCell, toCell);
            } else if ((fromCell.coords.x - toCell.coords.x === 2) && (toCell.coords.y === fromCell.coords.y) && fromCell.figure.name === FigureNames.KING) {
                this.longCastleFigures(fromCell, toCell);
            } else {
                this.boardModel.getOne(toCell.coords.x, toCell.coords.y).figure = fromCell.figure;
                this.boardModel.getOne(fromCell.coords.x, fromCell.coords.y).figure = null;
            }
        }
    }

    public canMove(fromCell: CellModel, toCell: CellModel, checkIsKingInCheck: boolean = true): boolean {
        if (fromCell.figure === null)
            return false;

        if (toCell.figure?.color === fromCell.figure.color)
            return false;

        const movingFigureColor = fromCell.figure.color;

        if (checkIsKingInCheck) {
            const tempFromCellFigure = fromCell.figure;
            const tempToCellFigure = toCell.figure;

            toCell.figure = fromCell.figure;
            fromCell.figure = null;

            const isKingInCheckAfterMove = this.isKingInCheck(movingFigureColor);

            fromCell.figure = tempFromCellFigure;
            toCell.figure = tempToCellFigure;

            if (isKingInCheckAfterMove)
                return false;
        }

        switch (fromCell.figure.name) {
            case FigureNames.PAWN:
                return this.canPawnMove(fromCell, toCell);
            case FigureNames.BISHOP:
                return this.canBishopMove(fromCell, toCell);
            case FigureNames.KING:
                return this.canKingMove(fromCell, toCell);
            case FigureNames.KNIGHT:
                return this.canKnightMove(fromCell, toCell);
            case FigureNames.QUEEN:
                return this.canQueenMove(fromCell, toCell);
            case FigureNames.ROOK:
                return this.canRookMove(fromCell, toCell);
        }
    }

    private canPawnMove(fromCell: CellModel, toCell: CellModel): boolean {
        const figure = fromCell.figure;

        if (!figure)
            return false;

        const direction = figure.color === Colors.BLACK ? 1 : -1;
        const FSDirection = direction * 2;

        const isFirstStep = figure.color === Colors.BLACK ? fromCell.coords.y === 1 : fromCell.coords.y === 6;

        if (
            ((toCell.coords.y - fromCell.coords.y === FSDirection && isFirstStep) ||
            toCell.coords.y - fromCell.coords.y === direction) &&
            toCell.coords.x === fromCell.coords.x &&
            toCell.isEmpty()) {
            return true;
        }

        if (!toCell.figure)
            return false;

        if (
            toCell.coords.y === fromCell.coords.y + direction &&
            (toCell.coords.x === fromCell.coords.x + 1 || toCell.coords.x === fromCell.coords.x - 1) &&
            figure.color !== toCell.figure?.color
        ) {
            return true;
        }

        return false;
    }

    private canBishopMove(fromCell: CellModel, toCell: CellModel): boolean {
        return !!this.cellService?.isEmptyDiagonal(fromCell, toCell);
    }

    private canKingMove(fromCell: CellModel, toCell: CellModel): boolean {
        if (
            (
                (toCell.coords.x - fromCell.coords.x === 2) ||
                (fromCell.coords.x - toCell.coords.x === 2)
            )
            && (toCell.coords.y === fromCell.coords.y)
        ) {
            /* castling logic */
            const rightRook = toCell.figure;

            if (!fromCell.figure?.hasMoved && !rightRook?.hasMoved) {
                return !!this.cellService?.isEmptyHorizontal(fromCell, toCell);
            }
        }

        /* default king moving logic */
        if (
            (Math.abs(toCell.coords.x - fromCell.coords.x) === 1 && Math.abs(toCell.coords.y - fromCell.coords.y) === 0) ||
            (Math.abs(toCell.coords.x - fromCell.coords.x) === 0 && Math.abs(toCell.coords.y - fromCell.coords.y) === 1) ||
            (Math.abs(toCell.coords.x - fromCell.coords.x) === 1 && Math.abs(toCell.coords.y - fromCell.coords.y) === 1)
        ) {
            return true;
        }

        return false;
    }

    private canKnightMove(fromCell: CellModel, toCell: CellModel): boolean {
        const dx = Math.abs(fromCell.coords.x - toCell.coords.x);
        const dy = Math.abs(fromCell.coords.y - toCell.coords.y);

        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
    }

    private canQueenMove(fromCell: CellModel, toCell: CellModel): boolean {
        return !!this.cellService?.isEmptyVertical(fromCell, toCell) ||
            !!this.cellService?.isEmptyHorizontal(fromCell, toCell) ||
            !!this.cellService?.isEmptyDiagonal(fromCell, toCell);
    }

    private canRookMove(fromCell: CellModel, toCell: CellModel): boolean {
        return !!this.cellService?.isEmptyHorizontal(fromCell, toCell) || !!this.cellService?.isEmptyVertical(fromCell, toCell)
    }
}
