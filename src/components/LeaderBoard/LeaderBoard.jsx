import { useEffect, useState } from "react";
import styles from "./LeaderBoard.module.css";
import { getLeaderBoard } from "../../api";

export function LeaderBoard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    getLeaderBoard()
      .then(data => {
        const sortLeaders = data.leaders.sort((a, b) => a.time - b.time);
        setLeaders(sortLeaders);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.leader_board}>
          <th>Позиция</th>
          <th>Пользователь</th>
          <th>Достижения</th>
          <th>Время</th>
        </tr>
      </thead>

      <tbody className={styles.tbody}>
        {leaders.map((leader, index) => {
          return (
            <tr className={styles.game_leader} key={leader.id}>
              <td>#{index + 1}</td>
              <td>{leader.name}</td>
              <td className={styles.leaderboard_achievements}>
                {leader.achievements && leader.achievements.includes(1) ? (
                  <div className={styles.block_achievements} hint="Игра пройдена в сложном режимe">
                    <button className={styles.puzzle}></button>
                  </div>
                ) : (
                  <button className={styles.puzzleGray}></button>
                )}

                {leader.achievements && leader.achievements.includes(2) ? (
                  <div className={styles.block_achievements} hint="Игра пройдена без супер-сил">
                    <button className={styles.vision}></button>
                  </div>
                ) : (
                  <button className={styles.visionGray}></button>
                )}
              </td>
              <td className={styles.time}>
                {Math.floor(leader.time / 60)
                  .toString()
                  .padStart(2, "0")}
                :{(leader.time % 60).toString().padStart(2, "0")}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
