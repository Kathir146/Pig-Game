import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GamePage from "./Components/GamePage/GamePage";
import GameListPage from "./Components/GameListPage";
import NotFound from "./Components/NotFound";
import Players from "./Components/Players/Players";
import Header from "./Components/Header/Header";
import StickyPopup from "./Components/StickyPopup/StickyPopup";

function App() {
  return (
    <Router>
      <div className="App">
        <StickyPopup />
        {/* player1Name={player1Name} */}
        <Header />
        <Routes>
          <Route path="/" element={<Players />} />
          <Route path="/game" element={<GamePage />} />
          {/* player1Name={player1Name} player2Name={player2Name} */}
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/games" element={<GameListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
