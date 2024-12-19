import React, { useEffect, useState } from "react";
import rock from "./Components/Assets/rock.png";
import paper from "./Components/Assets/paper.png";
import scissors from "./Components/Assets/scissors.png";
import StickyPopup from "./Components/StickyPopup/StickyPopup";

const choices = [rock, paper, scissors];

function App() {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [inputVisible, setInputVisible] = useState(true);
  const [player1Choice, setPlayer1Choice] = useState(null);
  const [player2Choice, setPlayer2Choice] = useState(null);
  const [player1Points, setPlayer1Points] = useState(0);
  const [player2Points, setPlayer2Points] = useState(0);
  const [roundWinner, setRoundWinner] = useState(null);
  const [winner, setWinner] = useState(null);
  const [round, setRound] = useState(1);

  const getRandomChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const handlePlayerClick = (player) => {
    if (round <= 6) {
      const randomChoice = getRandomChoice();
      if (player === 1) {
        setPlayer1Choice(randomChoice);
      } else if (player === 2) {
        setPlayer2Choice(randomChoice);
      }
    }
  };

  useEffect(() => {
    if (player1Choice && player2Choice) {
      determineWinner();
    }
  }, [player1Choice, player2Choice]);

  const determineWinner = () => {
    if (round <= 6) {
      if (
        (player1Choice === rock && player2Choice === scissors) ||
        (player1Choice === paper && player2Choice === rock) ||
        (player1Choice === scissors && player2Choice === paper)
      ) {
        setPlayer1Points((points) => points + 1);
        setRoundWinner(`${player1Name} gets the point!`);
      } else if (
        (player2Choice === rock && player1Choice === scissors) ||
        (player2Choice === paper && player1Choice === rock) ||
        (player2Choice === scissors && player1Choice === paper)
      ) {
        setPlayer2Points((points) => points + 1);
        setRoundWinner(`${player2Name} gets the point!`);
      } else if (player1Choice === player2Choice) {
        setRoundWinner("No one gets a point!");
      }
    }

    if (round === 6) {
      if (player1Points > player2Points) {
        setWinner(`${player1Name} Wins!`);
      } else if (player2Points > player1Points) {
        setWinner(`${player2Name} Wins!`);
      } else {
        setWinner("It's a Draw!");
      }
    }
  };

  const handlePlayerNameChange = (event, player) => {
    const playerName = event.target.value;
    if (player === 1) {
      setPlayer1Name(playerName);
    } else if (player === 2) {
      setPlayer2Name(playerName);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (player1Name && player2Name) {
        setInputVisible(false);
      }
    }
  };

  const startNewRound = () => {
    if (round <= 6) {
      setPlayer1Choice(null);
      setPlayer2Choice(null);
      setRoundWinner(null);
      setRound((prevRound) => prevRound + 1);
    }
  };

  const resetGame = () => {
    setPlayer1Name("");
    setPlayer2Name("");
    setInputVisible(true);
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setPlayer1Points(0);
    setPlayer2Points(0);
    setRoundWinner(null);
    setRound(1);
    setWinner(null);
  };

  return (
    <main>
      <section
        className={`player player--0 player--active ${
          round > 6 && player1Points > player2Points ? "player--winner" : ""
        }`}
      >
        <h2 className="name">{player1Name ? player1Name : "Player 1"}</h2>
        <input
          type="text"
          className={`playerName ${inputVisible ? "" : "hidden"}`}
          value={player1Name}
          placeholder="Your Name?"
          onChange={(event) => handlePlayerNameChange(event, 1)}
          onKeyDown={handleKeyPress}
        />
        <p className="score">{player1Points}</p>
        <p className="winner">
          {round > 6 && player1Points > player2Points && "Congratulations !"}
        </p>
        <div className={`choice ${round > 6 && "hidden"}`}>
          <button
            className="btn player-1"
            onClick={() => handlePlayerClick(1)}
            disabled={!player1Name || round > 6}
          >
            &rarr;
          </button>
        </div>
        <img
          src={player1Choice}
          alt=""
          className={`rps-image p0 ${player1Choice ? "visible" : "hidden"}`}
        />
      </section>

      <section
        className={`player player--1 ${
          round > 6 && player2Points > player1Points ? "player--winner" : ""
        }`}
      >
        <h2 className="name">{player2Name ? player2Name : "Player 2"}</h2>
        <input
          type="text"
          className={`playerName ${inputVisible ? "" : "hidden"}`}
          value={player2Name}
          placeholder="Your Name?"
          onChange={(event) => handlePlayerNameChange(event, 2)}
          onKeyDown={handleKeyPress}
        />
        <p className="score">{player2Points}</p>
        <p className="winner">
          {round > 6 && player1Points < player2Points && "Congratulations!"}
        </p>
        <div className={`choice ${round > 6 && "hidden"}`}>
          <button
            className="btn player-2"
            onClick={() => handlePlayerClick(2)}
            disabled={!player2Name || round > 6}
          >
            &larr;
          </button>
        </div>
        <img
          src={player2Choice}
          alt=""
          className={`rps-image p1 ${player2Choice ? "visible" : "hidden"}`}
        />
      </section>

      <div className={`current ${round > 6 && "pad"}`}>
        <h2>{round > 6 ? "Game Over" : `Round ${round}`}</h2>
        <p className="current-label">{roundWinner}</p>
        <h3>{round > 6 && winner}</h3>
      </div>

      <button
        className={`btn--hold ${round > 6 ? "hidden" : "visible"}`}
        onClick={startNewRound}
        disabled={round > 6}
      >
        {round <= 5 ? "Next Round" : "Finish Game"}
      </button>
      {round > 6 && (
        <button className="btn--new" onClick={resetGame}>
          New Game
        </button>
      )}
    </main>
  );
}

export default App;
