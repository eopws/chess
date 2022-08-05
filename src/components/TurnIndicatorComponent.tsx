import React, { FC, useEffect, useState } from 'react'
import { CellModel, App as GameApp } from '@models/index'
import { Colors } from '@utils/index'


interface TurnIndicatorComponentProps {
    rerender: any;
}


const TurnIndicatorComponent: FC<TurnIndicatorComponentProps> = ({ rerender }) => {
    const [currentPlayerColor, setCurrentPlayerColor] = useState<Colors | null>(null);

    useEffect(() => {
        setCurrentPlayerColor(GameApp.getInstance().gameController.getWhoseTurnAction());
    }, [rerender]);

    if (!currentPlayerColor) {
        return <div className="inform-plate turn-plate">Завантаження</div>
    }

    return (
        <div className="inform-plate turn-plate">
            {currentPlayerColor === Colors.WHITE ? 'Ходять білі' : 'Ходять чорні' }
        </div>
    )
}

export default TurnIndicatorComponent
