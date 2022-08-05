import { BoardModel, CellModel, FigureNames, GameModel } from "@models/index";
import { FigureFactory } from "@factories/index";
import { Colors } from "@utils/index";
import { CellService } from "@service/CellService";


/**
 * Provides logic for starting a game
 */
export class GameController {
    constructor(
        private readonly gameModel: GameModel,
        private readonly boardModel: BoardModel,
        private readonly figureFactory: FigureFactory
    ) {}

    public startGameAction() {
        this.initCells();
        this.spawnFigures();
    }

    public getWhoseTurnAction(): Colors {
        return this.gameModel.getTurn();
    }

    public restartAction() {
        this.initCells();
        this.spawnFigures();
        this.gameModel.setTurn(Colors.WHITE);
    }

    private initCells() {
        this.boardModel.removeAllCells();

        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const color = (x + y) % 2 === 0 ? Colors.BLACK : Colors.WHITE;

                const cell = new CellModel(color, x, y);

                this.boardModel.addCell(cell);
            }
        }
    }

    private spawnPawns() {
        for (let i = 0; i < 8; i++) {
            this.boardModel.getOne(i, 1).setFigure(this.figureFactory.createFigure(FigureNames.PAWN, Colors.BLACK));
            this.boardModel.getOne(i, 6).setFigure(this.figureFactory.createFigure(FigureNames.PAWN, Colors.WHITE));
        }
    }

    private spawnKings() {
        this.boardModel.getOne(4, 0).setFigure(this.figureFactory.createFigure(FigureNames.KING, Colors.BLACK));
        this.boardModel.getOne(4, 7).setFigure(this.figureFactory.createFigure(FigureNames.KING, Colors.WHITE));
    }

    private spawnQueens() {
        this.boardModel.getOne(3, 0).setFigure(this.figureFactory.createFigure(FigureNames.QUEEN, Colors.BLACK));
        this.boardModel.getOne(3, 7).setFigure(this.figureFactory.createFigure(FigureNames.QUEEN, Colors.WHITE));
    }

    private spawnBishops() {
        this.boardModel.getOne(2, 0).setFigure(this.figureFactory.createFigure(FigureNames.BISHOP, Colors.BLACK));
        this.boardModel.getOne(5, 0).setFigure(this.figureFactory.createFigure(FigureNames.BISHOP, Colors.BLACK));

        this.boardModel.getOne(2, 7).setFigure(this.figureFactory.createFigure(FigureNames.BISHOP, Colors.WHITE));
        this.boardModel.getOne(5, 7).setFigure(this.figureFactory.createFigure(FigureNames.BISHOP, Colors.WHITE));
    }

    private spawnRooks() {
        this.boardModel.getOne(0, 0).setFigure(this.figureFactory.createFigure(FigureNames.ROOK, Colors.BLACK));
        this.boardModel.getOne(7, 0).setFigure(this.figureFactory.createFigure(FigureNames.ROOK, Colors.BLACK));

        this.boardModel.getOne(0, 7).setFigure(this.figureFactory.createFigure(FigureNames.ROOK, Colors.WHITE));
        this.boardModel.getOne(7, 7).setFigure(this.figureFactory.createFigure(FigureNames.ROOK, Colors.WHITE));
    }

    private spawnKnights() {
        this.boardModel.getOne(1, 0).setFigure(this.figureFactory.createFigure(FigureNames.KNIGHT, Colors.BLACK));
        this.boardModel.getOne(6, 0).setFigure(this.figureFactory.createFigure(FigureNames.KNIGHT, Colors.BLACK));

        this.boardModel.getOne(1, 7).setFigure(this.figureFactory.createFigure(FigureNames.KNIGHT, Colors.WHITE));
        this.boardModel.getOne(6, 7).setFigure(this.figureFactory.createFigure(FigureNames.KNIGHT, Colors.WHITE));
    }

    /**
     * Fills certain cells (defined by the rules) with figures
     */
    public spawnFigures() {
        this.spawnPawns();
        this.spawnKings();
        this.spawnQueens();
        this.spawnBishops();
        this.spawnRooks();
        this.spawnKnights();
    }
}
