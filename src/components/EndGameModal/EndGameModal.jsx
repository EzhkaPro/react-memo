import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import styles from "./EndGameModal.module.css";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { getLeaderBoard, addLeaderBoard } from "../../api";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick, isTop, achievement }) {
  const [nameLeader, setNameLeader] = useState("Пользователь");
  const [newLeader, setNewLeader] = useState(false);
  const gameTime = gameDurationMinutes * 60 + gameDurationSeconds;

  useEffect(() => {
    if (isTop) {
      getLeaderBoard().then(({ leaders }) => {
        leaders = leaders.sort(function (a, b) {
          return a.time - b.time;
        });
        if (leaders.length > 0 && leaders[0].time < gameTime) {
          setNewLeader(true);
        }
      });
    }
  }, []);

  function addPlayerToLeaders() {
    addLeaderBoard({
      name: nameLeader,
      time: gameTime,
      achievements: achievement,
    })
      .then(({ leaders }) => {
        console.log(leaders);
      })
      .catch(error => {
        alert(error.message);
      });
  }

  const title = isWon ? (newLeader ? "Вы попали на Лидерборд!" : "Вы победили!") : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      {newLeader ? (
        <input
          className={styles.input_user}
          type="text"
          placeholder={"Пользователь"}
          onChange={e => {
            setNameLeader(e.target.value);
          }}
          onKeyDown={e => {
            if (e.key === " ") {
              e.preventDefault(); // Запретить ввод пробела
            }
          }}
        />
      ) : (
        <div></div>
      )}
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>
      {newLeader ? (
        <>
          <Link to="/leaderboard">
            <Button
              onClick={() => {
                addPlayerToLeaders();
                onClick();
              }}
            >
              Отправить результат
            </Button>
          </Link>

          <Button
            onClick={() => {
              addPlayerToLeaders();
              onClick();
            }}
          >
            Играть снова
          </Button>
        </>
      ) : (
        <>
          <Button onClick={onClick}>Начать сначала</Button>
          <Link to="/">
            <Button> На главную</Button>
          </Link>
        </>
      )}
      {newLeader && (
        <Link to="/leaderboard" className={styles.linkBoard}>
          Перейти к лидерборду
        </Link>
      )}
    </div>
  );
}
