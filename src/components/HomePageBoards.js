import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddBoard from "./AddBoard";

import styles from "../styles/HomePageBoards.module.css";

const HomePageBoards = (props) => {
  console.log(props);
  console.log(props.boards);

  return (
    <>
      <h3 className={styles.boards_header}>{props.title}</h3>
      <div className={styles.board_card_container}>
        {props.boards.map((board) => {
          return (
            <Link to={`/boards/${board.id}`} key={board.id}>
              <div
                className={styles.board_card}
                style={{ backgroundColor: board.backgroundColor }}
              >
                <h4 className={styles.board_card__name}>{`${board.name}`}</h4>
              </div>
            </Link>
          );
        })}
        <AddBoard boards={props.boards} setBoards={props.setBoards} />
      </div>
    </>
  );
};

export default HomePageBoards;
