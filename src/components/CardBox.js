import React, { useEffect, useState } from "react";
import { useAuth0 } from "../magello-spa";

import styles from "../styles/CardBox.module.css";

const CardBox = (card) => {
  const { loading, user, getTokenSilently } = useAuth0();
  const id = card.id;
  const [data, setData] = useState("");

  useEffect(() => {
    setData(card.data);
  }, []);
  // console.log(card);

  if (data) {
    return (
      <div className={styles.card_box}>
        <h3 className={styles.card_name}>{card.name}</h3>
        <img
          className={styles.card_details_icon}
          alt="Card details"
          src={require("../images/details.png")}
        />
      </div>
    );
  }

  return (
    <div className={styles.card_box}>
      <h3 className={styles.card_name}>{card.name}</h3>
    </div>
  );
};

export default CardBox;
