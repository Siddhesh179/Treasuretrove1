import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import GameGrid from "./Gamegrid.jsx";
import styles from "./game.module.css";
import getRandomPosition from "../Landingpage/generaterandomposition.jsx";

const INITIAL_TIME = 3; //Defining total countdown time for the game
const GRID_SIZE = 5; //Initializing the grid size(GRID_SIZE*GRID_SIZE)

const Game = ({ score, setScore }) => {
  const [player, setPlayer] = useState({ x: 0, y: 0 }); //State storing players position
  const [coin, setCoin] = useState(getRandomPosition({ x: 0, y: 0 })); //State storing coins position
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME); //state storing remaining time
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          navigate("/game-over"); //Navigate to Gameover page once countdown reaches 0
          return 0;
        }
        return prevTime - 1; //decrease time by 1 second
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);
  //Callback function handling all the keyevents to update the position of player
  const handleKeyPress = useCallback(
    (event) => {
      setPlayer((prevPlayer) => {
        let newPlayer = { ...prevPlayer };
        const moves = {
          ArrowUp: () => newPlayer.y > 0 && newPlayer.y--, //Move up
          ArrowDown: () => newPlayer.y < GRID_SIZE - 1 && newPlayer.y++, //Move down
          ArrowLeft: () => newPlayer.x > 0 && newPlayer.x--, //Move left
          ArrowRight: () => newPlayer.x < GRID_SIZE - 1 && newPlayer.x++, //Move right
        };
        moves[event.key]?.();

        if (newPlayer.x === coin.x && newPlayer.y === coin.y) {
          //checking whether position of player===coin
          setCoin(getRandomPosition(newPlayer)); //change  coin's position first
          setScore((prevScore) => prevScore + 1); //increase the score
        }

        return newPlayer;
      });
    },
    [coin, setScore]
  );
  //adding keydown(when key is clicked) event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return (
    <>
      
      <Header score={score} timeLeft={timeLeft} />
      <div className={styles.grd}>
        <h1 className={styles.title}>
          Demonstration of Our Computer Vision Model
        </h1>
        <GameGrid player={player} coin={coin} />
      </div>
    </>
  );
};

export default Game;
