import React, { useEffect, useState } from 'react';
import { BoardWithHUDComponent } from '@components/index';
import { App as GameApp } from '@models/index';
import './App.css';


function App() {
    useEffect(() => {
        GameApp.getInstance().gameController.startGameAction();
    }, [])

    return (
        <div className="app">
            <BoardWithHUDComponent />
        </div>
    );
}

export default App;
