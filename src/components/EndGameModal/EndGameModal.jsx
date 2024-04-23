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
        console.log(leaders[0].time, gameTime);
        if (leaders.length < 10 || gameTime < leaders[9].time) {
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
        setNewLeader(true);
      })
      .catch(error => {
        alert(error.message);
      });
  }

  const title = isWon ? (newLeader ? "Вы попали на Лидерборд!" : "Вы победили!") : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  return (
    <>
      {newLeader ? (
        <div className={styles.modal}>
          <img className={styles.image} src={imgSrc} alt={imgAlt} />
          <h2 className={styles.title}>{title}</h2>
          <input
            className={styles.input_user}
            type="text"
            placeholder={"Введите имя"}
            onChange={e => {
              setNameLeader(e.target.value);
            }}
            onKeyDown={e => {
              if (e.key === " ") {
                e.preventDefault(); // Запретить ввод пробела
              }
            }}
          />
          <p className={styles.description}>Затраченное время:</p>
          <div className={styles.time}>
            {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
          </div>
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
            }}
          >
            Начать снова
          </Button>
          <Link
            to="/leaderboard"
            className={styles.linkBoard}
            onClick={() => {
              addPlayerToLeaders();
            }}
          >
            Перейти к лидерборду
          </Link>
        </div>
      ) : (
        <div className={styles.modal}>
          <img className={styles.image} src={imgSrc} alt={imgAlt} />
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>Затраченное время:</p>
          <div className={styles.time}>
            {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
          </div>
          <Button onClick={onClick}>Начать сначала</Button>
          <Link to="/">
            <Button> На главную</Button>
          </Link>
        </div>
      )}
    </>
  );
}
