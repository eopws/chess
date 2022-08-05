import { FigureService } from "@service/index";
import { Colors } from "@utils/Colors";


/**
 * Provides figure data and process input
 */
export class FigureController {
    constructor(
        private readonly figureService: FigureService
    ) {}

    public getIsKingInCheckAction(): Colors | null {
        if (this.figureService.isKingInCheck(Colors.BLACK)) {
            return Colors.BLACK;
        } else if (this.figureService.isKingInCheck(Colors.WHITE)) {
            return Colors.WHITE;
        }

        return null;
    }

    public getIsKingInCheckMateAction(): Colors | null {
        if (this.figureService.isKingInCheckMate(Colors.BLACK)) {
            return Colors.BLACK;
        } else if (this.figureService.isKingInCheckMate(Colors.WHITE)) {
            return Colors.WHITE;
        }

        return null;
    }
}
