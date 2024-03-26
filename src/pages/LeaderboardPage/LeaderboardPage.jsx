import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import styles from "./LeaderBoardPage.module.css";
import { LeaderBoard } from "../../components/LeaderBoard/LeaderBoard";

export function LeaderBoardPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.text}>Лидерборд</p>
        <Link to="/">
          <Button>Начать игру</Button>
        </Link>
      </div>
      <LeaderBoard />
    </div>
  );
}
