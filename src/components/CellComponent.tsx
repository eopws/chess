import React, { FC, ReactNode, useEffect } from 'react'
import { Colors } from '@utils/index'
import { CellModel } from '@models/index'

interface ICellProps {
    cell: CellModel;
    selected: boolean;
    ctx: CanvasRenderingContext2D;
}

const CellComponent: FC<ICellProps> = ({ cell, selected, ctx }) => {
    useEffect(() => {
        if (cell.coords.x === 0 && cell.coords.y === 0)
            console.log('rendering cell')
        const cellSize = 64;

        ctx.fillStyle = cell.color === Colors.WHITE ? '#FFCF9F' : '#D28C45';

        if (selected)
            ctx.fillStyle = '#8A2324';

        ctx.fillRect(cell.coords.x * cellSize, cell.coords.y * cellSize, cellSize, cellSize);
    }, [selected]);

    return (<></>)
    /*return (
        <div
            className={
                "cell" + ' ' +
                (cell.color === Colors.WHITE ? 'cell--white' : 'cell--black') + ' ' +
                (selected ? 'cell--selected' : '') + ' ' +
                (cell.available && cell.figure ? 'cell--attackable' : '')
            }
            onClick={() => onClick()}
        >
            <div className={(cell.available && !cell.figure) ? 'cell__available-sign' : ''}></div>
            {cell.figure && <img src={cell.figure.logo} draggable={false} />}
        </div>
    )*/
}

export default CellComponent
