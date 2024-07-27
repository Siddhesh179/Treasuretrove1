import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import styles from "./game.module.css";
import Header from "./Header.jsx";

const GRID_SIZE = 5;
const INITIAL_TIME = 10;

const getRandomPosition = (excludePosition) => {
  let newPosition;
  do {
    newPosition = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (
    excludePosition &&
    newPosition.x === excludePosition.x &&
    newPosition.y === excludePosition.y
  );
  return newPosition;
};

const Game = ({ score, setScore }) => {
  const [player, setPlayer] = useState({ x: 0, y: 0 });
  const [coin, setCoin] = useState(getRandomPosition({ x: 0, y: 0 }));
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          navigate("/game-over");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleKeyPress = useCallback(
    (event) => {
      setPlayer((prevPlayer) => {
        let newPlayer = { ...prevPlayer };
        if (event.key === "ArrowUp" && prevPlayer.y > 0) {
          newPlayer.y -= 1;
        } else if (event.key === "ArrowDown" && prevPlayer.y < GRID_SIZE - 1) {
          newPlayer.y += 1;
        } else if (event.key === "ArrowLeft" && prevPlayer.x > 0) {
          newPlayer.x -= 1;
        } else if (event.key === "ArrowRight" && prevPlayer.x < GRID_SIZE - 1) {
          newPlayer.x += 1;
        }

        if (newPlayer.x === coin.x && newPlayer.y === coin.y) {
          setCoin(getRandomPosition(newPlayer));
          setScore((prevScore) => prevScore + 1);
        }

        return newPlayer;
      });
    },
    [coin, setScore]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <Header score={score} timeLeft={timeLeft}/>
      <div className={styles.grd}>
        <h1 className={styles.title}>Demonstration of Our Computer Vision Model</h1>
        <div className={styles.grid}>
          {Array.from({ length: GRID_SIZE }).map((_, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {Array.from({ length: GRID_SIZE }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className={`cell ${
                    player.x === colIndex && player.y === rowIndex
                      ? "player"
                      : ""
                  } ${
                    coin.x === colIndex && coin.y === rowIndex ? "coin" : ""
                  }`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Game;
