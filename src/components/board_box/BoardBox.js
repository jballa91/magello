import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import BoardBoxButton from "./BoardBoxButton";
import BoardBoxForm from "./BoardBoxForm";

import styles from "../../styles/board_box/BoardBox.module.css";

const BoardBox = (props) => {
  const [open, setOpen] = useState(false);
  const board = props.board;

  return (
    <div
      className={styles.board_card}
      style={{ backgroundColor: board.backgroundColor }}
    >
      {open ? (
        <BoardBoxForm
          handler={setOpen}
          board={props.board}
          boards={props.boards}
          setBoards={props.setBoards}
        />
      ) : (
        <BoardBoxButton handler={setOpen} board={props.board} />
      )}
    </div>
  );
};

export default withRouter(BoardBox);
