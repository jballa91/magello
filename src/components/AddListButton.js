import React from "react";
import { withRouter } from "react-router-dom";

import styles from "../styles/AddListButton.module.css";

const AddListButton = (props) => {
  const openClose = props.handler;
  return (
    <div className={styles.add_list_button} onClick={() => openClose(true)}>
      <h1 className={styles.add_list_button__icon}>+</h1>
      <h1 className={styles.add_list_button__text}>Name that list...</h1>
    </div>
  );
};

export default withRouter(AddListButton);
