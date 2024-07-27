import React from 'react';
import styles from './howto.module.css';

const Howto = ({ onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>How to Play</h2>
        <p>Welcome to the game! Here are the rules:</p>
        <ul>
          <li>The coins are generated randomly and you collect the coin when you reach that position</li>
          <li>Collecting coins increase your score.</li>
          <li>Avoid running out of time. The game ends when the timer reaches zero.</li>
          <li>Try to collect as many coins as possible before the time runs out!</li>
        </ul>
      </div>
    </div>
  );
};

export default Howto;
