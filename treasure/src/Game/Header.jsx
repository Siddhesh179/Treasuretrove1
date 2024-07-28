import styles from "./header.module.css";
export default function Header({ score, timeLeft }) {
  return (
    <>
      <div className={styles.header}>
        TreasureTrove
        <div className={styles.details}>
          <div className={styles.score}>Score: {score}</div>
          <div className={styles.time}>Time: {timeLeft} Seconds</div>
        </div>
      </div>
    </>
  );
}
