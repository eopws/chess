import React, { FC, useCallback, useEffect, useState } from 'react'
import { Colors } from '@utils/index';
import { App as GameApp } from '@models/index';


interface LoseBoxComponentProps {
    rerender: any;
    restartGame: () => void;
}


const LoseBoxComponent: FC<LoseBoxComponentProps> = ({ rerender, restartGame }) => {
    const [isLoseBoxHidden, setIsLoseBoxHidden] = useState<boolean>(true);
    const [loseSide, setLoseSide] = useState<Colors | null>(null);
    const [isViewingField, setViewingField] = useState<boolean>(false);

    useEffect(() => {
        const kingInCheckMateColor = GameApp.getInstance().figureController.getIsKingInCheckMateAction();

        if (kingInCheckMateColor) {
            setLoseSide(kingInCheckMateColor);
            setIsLoseBoxHidden(false);
        } else {
            setLoseSide(null);
            setIsLoseBoxHidden(true);
        }
    }, [rerender])

    if (isLoseBoxHidden) {
        return <></>;
    }

    return (
        <div className={"lose-box" + (isViewingField ? ' lose-box--hidden' : '')}>
            {!isViewingField &&
                <div className="lose-box__wrapper">
                    <div className="lose-box__content">
                        {loseSide === Colors.WHITE ? 'Білі програли :(' : 'Чорні програли'}

                        <div className="lose-box__buttons justify-between">
                            <button onClick={() => setViewingField(true)} className="btn">Подивитись поле</button>
                            <button onClick={restartGame} className="btn">Грати заново</button>
                        </div>
                    </div>
                </div>
            }

            {isViewingField &&
                <button onClick={() => setViewingField(false)} className="btn">Повернутись</button>
            }
        </div>
    )
}

export default LoseBoxComponent
