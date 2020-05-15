import React, { useEffect, useState } from "react";
import { useAuth0 } from "../magello-spa";
import { api } from "../config";

import CardBox from "./CardBox";

import styles from "../styles/ListBox.module.css";

const ListBox = (props) => {
  const { loading, user, getTokenSilently } = useAuth0();
  const id = props.id;
  const [cards, setCards] = useState([]);
  // console.log(props);

  useEffect(() => {
    async function getCards(id) {
      const token = await getTokenSilently();
      const res = await fetch(`${api}/lists/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let { cards } = await res.json();
      setCards(cards);
    }
    getCards(id);
  }, []);

  return (
    <>
      <div className={styles.list_box}>
        <h1 className={styles.list_box_name}>{`${props.name}`}</h1>
        {cards.map((card) => (
          <CardBox {...card} key={card.id} />
        ))}
      </div>
    </>
  );
};

export default ListBox;
