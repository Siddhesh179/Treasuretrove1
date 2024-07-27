import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./gameover.module.css";

const GameOver = ({ score, addScore, resetScore }) => {
  const navigate = useNavigate();

  useEffect(() => {
    addScore(score);
  }, [score, addScore]);

  const handlePlayAgain = () => {
    resetScore();
    navigate("/game");
  };

  return (
    <div className={styles.gameover}>
      <h1 className={styles.title}>Game Over</h1>
      <p className={styles.scr}>Your Score: {score}</p>
      <div>
        <button className={styles.btn} onClick={handlePlayAgain}>
          Play Again
        </button>
        <Link to="/" className={styles.ldrbrd}>
          Return to Home page
        </Link>
      </div>
    </div>
  );
};

export default GameOver;
