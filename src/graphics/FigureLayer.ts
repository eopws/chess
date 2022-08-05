import { BasicLayer } from "@graphics/index";
import { CellModel } from "@models/index";
import { cellSize } from "@utils/index";

export class FigureLayer extends BasicLayer {
    animationCanvas: HTMLCanvasElement;
    animationCtx: CanvasRenderingContext2D;

    constructor(staticCanvas: HTMLCanvasElement, animationCanvas: HTMLCanvasElement) {
        super(staticCanvas);

        const animationCtx = animationCanvas.getContext('2d');

        if (!animationCtx)
            throw new Error('cannot get rendering context');

        this.animationCanvas = animationCanvas;
        this.animationCtx = animationCtx;
    }

    public initDraw(cells: CellModel[]) {
        this.animationCtx.clearRect(0, 0, 512, 512);
        this.ctx.clearRect(0, 0, 512, 512);

        cells.map(cell => {
            if (cell.figure)
                this.drawFigure(cell);
        });
    }

    private drawFigure(cell: CellModel) {
        if (!cell.figure) {
            throw new Error();
        }

        const compressionImgCoefficient = 15;
        const imgSize = cellSize - compressionImgCoefficient;

        const image = new Image(imgSize, imgSize);

        image.src = cell.figure.logo;

        // complex calculations
        image.onload = () => this.ctx.drawImage(image, cell.coords.x * cellSize + (compressionImgCoefficient / 2), cell.coords.y * cellSize + (compressionImgCoefficient / 2), imgSize, imgSize);
    }

    public async step(prevCells: CellModel[], newCells: CellModel[]) {
        for (let i = 0; i < newCells.length; i++) {
            for (let j = 0; j < prevCells.length; j++) {
                if (prevCells[j].figure?.id == newCells[i].figure?.id && prevCells[j].figure != null && i != j) {
                    await this.animateStep(prevCells[j], newCells[i]);
                }
            }
        }
    }

    private animateStep(fromCell: CellModel, toCell: CellModel) {
        if (!fromCell.figure) {
            throw new Error('from cell does not have a figure (in animate step)');
        }

        const compressionImgCoefficient = 15;
        const imgSize = cellSize - compressionImgCoefficient;

        const image = new Image(imgSize, imgSize);

        image.src = fromCell.figure.logo;

        return new Promise((resolve, reject) => {
            image.onload = () => {
                this.ctx.clearRect(fromCell.coords.x * 64, fromCell.coords.y * 64, 64, 64);

                const xDirection = fromCell.coords.x - toCell.coords.x > 0 ? -4 : 4;
                const yDirection = fromCell.coords.y - toCell.coords.y > 0 ? -4 : 4;

                let currentX = 0;
                let currentY = 0;

                const movementAnimation = () => {
                    this.animationCtx.clearRect(0, 0, 512, 512);

                    const newX = fromCell.coords.x * cellSize + (compressionImgCoefficient / 2) + currentX;
                    const newY = fromCell.coords.y * cellSize + (compressionImgCoefficient / 2) + currentY;

                    this.animationCtx.drawImage(image, newX, newY, imgSize, imgSize);

                    let shouldContininueAnimation = false;

                    if (newX !== toCell.coords.x * cellSize + (compressionImgCoefficient / 2)) {
                        currentX += xDirection;
                        shouldContininueAnimation = true;
                    }

                    if (newY !== toCell.coords.y * cellSize + (compressionImgCoefficient / 2)) {
                        currentY += yDirection;
                        shouldContininueAnimation = true;
                    }

                    if (shouldContininueAnimation)
                        requestAnimationFrame(movementAnimation)
                    else {
                        this.ctx.clearRect(fromCell.coords.x * cellSize + currentX, fromCell.coords.y * cellSize + currentY, 64, 64);
                        this.ctx.drawImage(image, newX, newY, imgSize, imgSize);
                        resolve(true);
                    }
                };

                requestAnimationFrame(movementAnimation);
            }
        })
    }
}
