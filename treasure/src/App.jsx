import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import GameOver from "./Gameover.jsx";
import StartGame from "./Startgame.jsx";
import Game from "./Game.jsx";

const App = () => {
  const [score, setScore] = useState(0);
  const [scores, setScores] = useState(() => {
    const savedScores = JSON.parse(localStorage.getItem("scores")) || [];
    return savedScores;
  });

  const addScore = (newScore) => {
    const updatedScores = [...scores, newScore]
      .sort((a, b) => b - a)
      .slice(0, 10);
    setScores(updatedScores);
    localStorage.setItem("scores", JSON.stringify(updatedScores));
  };

  const resetScore = () => {
    setScore(0);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartGame resetScore={resetScore} />} />
        <Route
          path="/game"
          element={<Game score={score} setScore={setScore} />}
        />
        <Route
          path="/game-over"
          element={
            <GameOver
              score={score}
              addScore={addScore}
              resetScore={resetScore}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
