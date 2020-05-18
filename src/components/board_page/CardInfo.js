import React from "react";

import styles from "../../styles/board_page/CardInfo.module.css";

const CardInfo = (props) => {
  return (
    <>
      <div className={styles.card_info__wrapper}>
        <div className={styles.card_info__container}>
          <div className={styles.card_info__title_exit_container}>
            <h1 className={styles.card_info__title}>{props.name}</h1>
            <img
              className={styles.card_info__exit}
              src={require("../../images/x-mark.png")}
              alt="Exit"
              onClick={() => props.setModToggle(false)}
            ></img>
          </div>
          <div className={styles.card_info__data_container}>
            <p className={styles.card_info__data}>{props.data}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardInfo;
