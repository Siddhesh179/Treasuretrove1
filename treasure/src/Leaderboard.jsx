import React from "react";
import { Link } from "react-router-dom";
import "./leaderboard.module.css";

const Leaderboard = ({ scores }) => {
  const uniqueScores = Array.from(new Set(scores));
  const topScores = uniqueScores.sort((a, b) => b - a).slice(0, 10);

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <ul>
        {topScores.map((score, index) => (
          <li key={index}>{`Player ${index + 1}: ${score}`}</li>
        ))}
      </ul>
      <Link to="/">Back to Start</Link>
    </div>
  );
};

export default Leaderboard;
