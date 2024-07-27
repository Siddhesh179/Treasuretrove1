// src/StartGame.js
import React from "react";
import { Link } from "react-router-dom";
import style from "./startgame.module.css";

const StartGame = ({resetScore}) => {
  return (
    <div className={style.startgame}>
      <h1 className={style.title}>TreasureTrove </h1>
      <Link to="/game">
        <button className={style.startbutton} onClick={resetScore()}>Start Game</button>
      </Link>
    </div>
  );
};

export default StartGame;
