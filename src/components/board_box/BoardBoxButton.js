import React from "react";
import { Link, withRouter } from "react-router-dom";

import styles from "../../styles/board_box/BoardBoxButton.module.css";

const BoardBoxButton = (props) => {
  const openClose = props.handler;
  const board = props.board;

  const handleClick = (e) => {
    e.preventDefault();
    console.log("click");
    openClose(true);
  };

  return (
    <Link to={`/boards/${board.id}`} key={board.id}>
      <div className={styles.board_box_button__container}>
        <div className={styles.board_box_button__container}>
          <h4 className={styles.board_card__name}>{`${board.name}`}</h4>
        </div>
        <div className={styles.board_card__delete_button_container}>
          <button
            className={styles.board_card__delete_button}
            onClick={(e) => handleClick(e)}
          >
            Delete
          </button>
        </div>
      </div>
    </Link>
  );
};

export default withRouter(BoardBoxButton);
