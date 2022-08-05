import React, { useEffect, useState } from 'react';
import { BoardWithHUDComponent } from '@components/index';
import { App as GameApp } from '@models/index';
import './App.css';


function App() {
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        GameApp.getInstance().gameController.startGameAction();
        setGameStarted(true);
    }, [])

    if (!gameStarted)
        return <>loading</>;

    return (
        <div className="app">
            <BoardWithHUDComponent />
        </div>
    );
}

export default App;
