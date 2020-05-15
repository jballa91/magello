import React from "react";
import { withRouter } from "react-router-dom";

import styles from "../styles/AddBoardButton.module.css";

const AddBoardButton = (props) => {
  const openClose = props.handler;
  return (
    <div className={styles.add_board__button} onClick={() => openClose(true)}>
      <h4 className={styles.add_board__name}>Add a board...</h4>
    </div>
  );
};

export default withRouter(AddBoardButton);
