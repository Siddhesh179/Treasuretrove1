import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import GameOver from "./Gameover.jsx";
import StartGame from "./Startgame.jsx";
import Game from "./Game.jsx";

const App = () => {
  const [score, setScore] = useState(0);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const response = await axios.get("/api/scores");
      setScores(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  const addScore = async (newScore) => {
    try {
      const response = await axios.post("/api/scores", { score: newScore });
      setScores(response.data);
    } catch (error) {
      console.error("Error adding score:", error);
    }
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
