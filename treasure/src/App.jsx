import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom"; // Importing react-router-dom components
import axios from "axios";
import "./App.css";
import GameOver from "./Lastpage/Gameover.jsx";
import StartGame from "./Landingpage/Startgame.jsx";
import Game from "./Game/Game.jsx";
import PredictionComponent from "../../flaskfortt/Predictioncomponent.jsx"; // Importing the PredictionComponent

const App = () => {
  const [score, setScore] = useState(0); // State for the current score
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetchScores(); // Fetching scores when the component mounts
  }, []);

  // Function to fetch scores from the server
  const fetchScores = async () => {
    try {
      const response = await axios.get("/api/scores"); // Make GET request to fetch scores
      setScores(response.data); // Updating state with the fetched scores
      console.log(response);
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  // Function to add a new score to the server
  const addScore = async (newScore) => {
    try {
      const response = await axios.post("/api/scores", { score: newScore }); // To Make POST request
      setScores(response.data);
    } catch (error) {
      console.error("Error adding score:", error);
    }
  };

  // Function to reset the current score
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
        <Route path="/predict" element={<PredictionComponent />} />{" "}
        {/* Adding the route for PredictionComponent */}
      </Routes>
    </Router>
  );
};

export default App;
