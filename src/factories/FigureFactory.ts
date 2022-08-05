import { Pawn, King, Bishop, Knight, Queen, Rook } from "@models/figures/";
import { FigureModel, FigureNames } from "@models/index";
import { Colors } from "@utils/index";


/**
 * Creates specific type of a figure
 */
export class FigureFactory {
    private static figureId: number = 0;

    createFigure(name: FigureNames, color: Colors): FigureModel {
        FigureFactory.figureId++;

        switch (name) {
            case FigureNames.PAWN:
                return new Pawn(FigureFactory.figureId, color);
            case FigureNames.KING:
                return new King(FigureFactory.figureId, color);
            case FigureNames.BISHOP:
                return new Bishop(FigureFactory.figureId, color);
            case FigureNames.KNIGHT:
                return new Knight(FigureFactory.figureId, color);
            case FigureNames.QUEEN:
                return new Queen(FigureFactory.figureId, color);
            case FigureNames.ROOK:
                return new Rook(FigureFactory.figureId, color);
        }
    }
}
