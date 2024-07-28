import React from "react";
import styles from "./game.module.css";

// GameGrid component to display the game grid, player, and coin positions
const GameGrid = ({ player, coin }) => {
  const GRID_SIZE = 5;

  return (
    <div className={styles.grid}>
      {Array.from({ length: GRID_SIZE }).map((_, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {Array.from({ length: GRID_SIZE }).map((_, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${
                player.x === colIndex && player.y === rowIndex ? "player" : "" // Apply player class if player is at this cell
              } ${coin.x === colIndex && coin.y === rowIndex ? "coin" : ""}`}   // Apply coin class if coin is at this cell
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameGrid;
