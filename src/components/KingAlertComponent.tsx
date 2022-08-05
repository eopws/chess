import React, { FC, useEffect, useState } from 'react'
import { App as GameApp, CellModel } from '@models/index';
import { Colors } from '@utils/index';


interface KingAlertComponentProps {
    rerender: any;
}


const KingAlertComponent: FC<KingAlertComponentProps> = ({ rerender }) => {
    const [kingInCheckColor, setKingInCheckColor] = useState<Colors | null>(null);

    useEffect(() => {
        const isKingInCheck = GameApp.getInstance().figureController.getIsKingInCheckAction();

        setKingInCheckColor(isKingInCheck);
    }, [rerender]);

    if (!kingInCheckColor) {
        return <></>;
    }

    return (
        <div className="inform-plate king-in-check-alert">{kingInCheckColor === Colors.WHITE ? 'Білим шах' : 'Чорним шах'}</div>
    )
}

export default KingAlertComponent
