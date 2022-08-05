import { CellModel } from "@models/index";
import { Colors, cellSize } from "@utils/index";
import { BasicLayer } from "./BasicLayer";

export class CellLayer extends BasicLayer {
    public drawField(cells: CellModel[], selectedCell: CellModel | null) {
        this.ctx.clearRect(0, 0, 512, 512);

        cells.map(cell => {
            this.drawCell(cell, !!selectedCell && cell.compare(selectedCell));
        });
    }

    private drawCell(cell: CellModel, isSelected: boolean) {
        this.ctx.fillStyle = cell.color === Colors.WHITE ? '#FFCF9F' : '#D28C45';

        if (isSelected)
            this.ctx.fillStyle = '#8A2324';

        this.ctx.fillRect(cell.coords.x * cellSize, cell.coords.y * cellSize, cellSize, cellSize);

        if (cell.available) {
            this.ctx.fillStyle = '#22C022';

            if (cell.figure) {
                this.ctx.fillRect(cell.coords.x * cellSize, cell.coords.y * cellSize, cellSize, cellSize);
            } else {
                this.ctx.beginPath();
                this.ctx.arc(cell.coords.x * cellSize + 32, cell.coords.y * cellSize + 32, 6, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.closePath();
            }
        }
    }
}
