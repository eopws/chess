import { Colors } from "@utils/index";


/**
 * Stores game meta data
 */
export class GameModel {
    private currentTurn: Colors;

    constructor() {
        this.currentTurn = Colors.WHITE;
    }

    public getTurn() {
        return this.currentTurn;
    }

    public setTurn(color: Colors) {
        this.currentTurn = color;
    }

    public toggleTurn() {
        this.currentTurn = this.currentTurn === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
    }
}
