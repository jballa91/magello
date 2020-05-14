import React from "react";
import { Link } from "react-router-dom";

import styles from "../styles/HomePageBoards.module.css";

const HomePageBoards = (props) => {
  const boards = props.boards;
  return (
    <div className={styles.board_card_container}>
      {boards.map((board) => {
        return (
          <Link to={`/boards/${board.id}`} key={board.id}>
            <div
              className={styles.board_card}
              style={{ backgroundColor: board.backgroundColor }}
            >
              <h4 className={styles.board_card_name}>{`${board.name}`}</h4>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default HomePageBoards;
