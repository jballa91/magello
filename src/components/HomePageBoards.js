import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import BoardBox from "./board_box/BoardBox";
import AddBoard from "./add_board/AddBoard";

import styles from "../styles/HomePageBoards.module.css";

const HomePageBoards = (props) => {
  return (
    <>
      <h3 className={styles.boards_header}>{props.title}</h3>
      <div className={styles.board_card_container}>
        {props.boards.map((board) => {
          return (
            <BoardBox
              key={board.id}
              board={board}
              boards={props.boards}
              setBoards={props.setBoards}
            />
          );
        })}
        <AddBoard boards={props.boards} setBoards={props.setBoards} />
      </div>
    </>
  );
};

export default HomePageBoards;
