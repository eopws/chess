import React, { useCallback, useState } from 'react'
import { App as GameApp } from '@models/index';
import { BoardComponent, KingAlertComponent, LoseBoxComponent } from '@components/index';
import TurnIndicatorComponent from './TurnIndicatorComponent';


const BoardWithHUDComponent = () => {
    const [rerender, setRerender] = useState<boolean>(false);

    const restartGame = useCallback(() => {
        GameApp.getInstance().gameController.restartAction();
        updates();
        window.dispatchEvent(new Event('gameRestart'));
    }, []);

    const updates = useCallback(() => {
        setRerender(prev => !prev);
    }, []);

    return (
        <>
            <TurnIndicatorComponent
                rerender={rerender}
            />

            <KingAlertComponent
                rerender={rerender}
            />

            <BoardComponent
                rerender={rerender}
                onUpdate={updates}
            />

            <LoseBoxComponent
                rerender={rerender}
                restartGame={restartGame}
            />
        </>
    )
}

export default BoardWithHUDComponent
