import { CellController, FigureController, GameController } from "@controllers/index";
import { FigureFactory } from "@factories/index";
import { BoardModel, GameModel } from "@models/index";
import { CellService, FigureService } from "@service/index";


/**
 * Bootstraps the application application and provide user to the app logic
 */
export class App {
    public readonly cellController: CellController;
    public readonly figureController: FigureController;
    public readonly gameController: GameController;

    private static instance: App;

    private constructor() {
        const gameModel = new GameModel();
        const boardModel = new BoardModel();

        const cellService = new CellService(gameModel, boardModel);
        const figureService = new FigureService(gameModel, boardModel);

        cellService.initFigureService(figureService);
        figureService.initCellService(cellService);

        this.cellController = new CellController(boardModel, cellService);
        this.figureController = new FigureController(figureService);
        this.gameController = new GameController(gameModel, boardModel, new FigureFactory());
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new App();
        }

        return this.instance;
    }
}
