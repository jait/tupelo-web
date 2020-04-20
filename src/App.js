import React from 'react';
import './App.css';
import { AppHeader } from './components/AppHeader';
import { GameList } from './components/GameList';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <GameList games={[{id: "foo", players: [{name: "esko"}, {name: "seppo"}] }]}/>
    </div>
  );
}

export default App;
