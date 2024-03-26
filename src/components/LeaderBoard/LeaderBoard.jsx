import { useEffect, useState } from "react";
import styles from "./LeaderBoard.module.css";
import { getLeaderBoard } from "../../api";

import puzzleImageUrl from "./images/puzzle.svg";
import puzzleGrayImageUrl from "./images/puzzleGray.svg";
import visionImageUrl from "./images/vision.svg";
import visionGrayImageUrl from "./images/visionGray.svg";

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
              <td className={styles.achievements}>
                {leader.achievements && (
                  <div className={styles.block_achievements}>
                    {leader.achievements.includes(1) ? (
                      /*<button className={styles.puzzle} hint1="Игра пройдена в сложном режиме">*/
                      <img src={puzzleImageUrl} alt="пазл" className={styles.puzzle} />
                    ) : (
                      /* </button>*/
                      <img src={puzzleGrayImageUrl} alt="пазл серый" className={styles.puzzleGray} />
                    )}
                  </div>
                )}

                {leader.achievements && (
                  <div className={styles.block_achievements}>
                    {leader.achievements.includes(2) ? (
                      /* <button className={styles.vision} hint2="Игра пройдена без супер-сил">*/
                      <img src={visionImageUrl} alt="видение" className={styles.vision} />
                    ) : (
                      /*  </button> */
                      <img src={visionGrayImageUrl} alt="видение серый" className={styles.visionGray} />
                    )}
                  </div>
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
