import { Link, useNavigate } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { Button } from "../../components/Button/Button";
import { useContext } from "react";
import { GameContext } from "../../context/Context";

export function SelectLevelPage() {
  const { easyMode, setEasyMode, level, setLevel } = useContext(GameContext);

  const navigate = useNavigate();

  const handleLevelClick = value => {
    setLevel(value);
  };

  const handlePlayClick = () => {
    navigate(`/game/${level}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>

        <ul className={styles.levels}>
          <li className={styles.level}>
            <input type="radio" name="level" value="3" checked={level === "3"} onChange={() => {}} />
            <div
              className={level === "3" ? `${styles.levelLink} ${styles.checked}` : styles.levelLink}
              onClick={() => handleLevelClick("3")}
            >
              1
            </div>
          </li>
          <li className={styles.level}>
            <input type="radio" name="level" value="6" checked={level === "6"} onChange={() => {}} />
            <div
              className={level === "6" ? `${styles.levelLink} ${styles.checked}` : styles.levelLink}
              onClick={() => handleLevelClick("6")}
            >
              2
            </div>
          </li>
          <li className={styles.level}>
            <input type="radio" name="level" value="9" checked={level === "9"} onChange={() => {}} />
            <div
              className={level === "9" ? `${styles.levelLink} ${styles.checked}` : styles.levelLink}
              onClick={() => handleLevelClick("9")}
            >
              3
            </div>
          </li>
        </ul>

        <div>
          <input
            type="checkbox"
            checked={easyMode}
            onChange={() => setEasyMode(!easyMode)}
            className={styles.checkbox}
          />
          <span className={styles.span}>Легкий режим (3 жизни)</span>
        </div>

        <div>
          {level === null ? (
            <Button disabled>Играть</Button>
          ) : (
            <Button className={styles.button} onClick={handlePlayClick}>
              Играть
            </Button>
          )}
        </div>

        <Link className={styles.leaderboard} to="/leaderboard">
          Перейти к лидерборду
        </Link>
      </div>
    </div>
  );
}
