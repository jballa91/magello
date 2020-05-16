import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../magello-spa";

import CardInfo from "./CardInfo";

import styles from "../../styles/board_page/CardBox.module.css";

const CardBox = (props) => {
  const { loading, user, getTokenSilently } = useAuth0();
  const id = props.id;
  const [data, setData] = useState("");

  useEffect(() => {
    setData(props.data);
  }, []);

  if (data) {
    return (
      <>
        {props.modToggle ? (
          <CardInfo
            name={props.name}
            data={props.data}
            modToggle={props.modToggle}
            setModToggle={props.setModToggle}
          />
        ) : null}
        <div
          className={styles.card_box}
          onClick={() => props.setModToggle(true)}
        >
          <h3 className={styles.card_name}>{props.name}</h3>
          <img
            className={styles.card_details_icon}
            alt="Card details"
            src={require("../../images/details.png")}
          />
        </div>
      </>
    );
  }

  return (
    <div className={styles.card_box}>
      <h3 className={styles.card_name}>{props.name}</h3>
    </div>
  );
};

export default CardBox;
