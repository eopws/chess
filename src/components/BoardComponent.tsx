import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { App as GameApp, CellModel } from '@models/index';
import { CellLayer, FigureLayer } from '@graphics/index';


interface BoardComponentProps {
    rerender: any;
    onUpdate: () => void;
}


const BoardComponent: FC<BoardComponentProps> = ({ rerender, onUpdate }) => {
    const [selectedCell, setSelectedCell] = useState<CellModel | null>(null);
    const [cellLayer, setCellLayer] = useState<CellLayer | null>(null);
    const [figureLayer, setFigureLayer] = useState<FigureLayer | null>(null);
    const [isFigureMoving, setIsFigureMoving] = useState<boolean>(false);

    const cellCanvasRef = useRef<HTMLCanvasElement>(null);
    const figureCanvasRef = useRef<HTMLCanvasElement>(null);
    const figureAnimationCanvasRef = useRef<HTMLCanvasElement>(null);

    const onCellClick = ((event: React.MouseEvent<HTMLCanvasElement>) => {
        if (isFigureMoving || !cellCanvasRef.current)
            return;

        const canvasCoords = cellCanvasRef.current.getBoundingClientRect();

        const cellX = Math.floor((event.clientX - canvasCoords.left) / 64);
        const cellY = Math.floor((event.clientY - canvasCoords.top) / 64);

        const onStep = async (cellsBefore: CellModel[], cellsAfter: CellModel[]) => {
            setIsFigureMoving(true);
            await figureLayer?.step(cellsBefore, cellsAfter);
            setIsFigureMoving(false);
        }

        const newCell = GameApp.getInstance().cellController.selectCellAction(cellX, cellY, onStep);

        setSelectedCell(newCell);
    });

    useEffect(() => {
        const cells = GameApp.getInstance().cellController.getCellsAction();

        cellLayer?.drawField(cells, selectedCell);
    }, [rerender])

    useEffect(() => {
        onUpdate();
    }, [selectedCell])

    useEffect(() => {
        const cellCanvasElement = cellCanvasRef.current;
        const figureCanvasElement = figureCanvasRef.current;
        const figureAnimationCanvasElement = figureAnimationCanvasRef.current;

        if (!cellCanvasElement || !figureCanvasElement || !figureAnimationCanvasElement)
            return;

        const cells = GameApp.getInstance().cellController.getCellsAction();

        const cellLayerTemp = new CellLayer(cellCanvasElement);
        setCellLayer(cellLayerTemp);
        cellLayerTemp.drawField(cells, selectedCell);

        const figureServiceTemp = new FigureLayer(figureCanvasElement, figureAnimationCanvasElement);
        setFigureLayer(figureServiceTemp);
        figureServiceTemp.initDraw(cells);

        window.addEventListener('gameRestart', () => {
            figureServiceTemp.initDraw(GameApp.getInstance().cellController.getCellsAction());
            console.log('handling game restart');
            console.log(GameApp.getInstance().cellController.getCellsAction());
        });
    }, [])

    return (
        <div className="board">
            <canvas
                ref={cellCanvasRef}
                className="canvas canvas--clickable"
                height={512}
                width={512}
                onClick={e => onCellClick(e)}
            />

            <canvas
                ref={figureCanvasRef}
                className="canvas"
                height={512}
                width={512}
            />

            <canvas
                ref={figureAnimationCanvasRef}
                className="canvas"
                height={512}
                width={512}
            />
        </div>
    )
}

export default BoardComponent
