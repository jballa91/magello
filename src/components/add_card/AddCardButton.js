import React from "react";
import { withRouter } from "react-router-dom";

import styles from "../../styles/add_card/AddCardButton.module.css";

const AddCardButton = (props) => {
  const openClose = props.handler;
  return (
    <div className={styles.add_card_button} onClick={() => openClose(true)}>
      <h1 className={styles.add_card_button__icon}>+</h1>
      <h1 className={styles.add_card_button__text}>Add a card...</h1>
    </div>
  );
};

export default withRouter(AddCardButton);
