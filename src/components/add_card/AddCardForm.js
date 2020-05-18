import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useAuth0 } from "../../magello-spa";

import styles from "../../styles/add_card/AddCardForm.module.css";
import { api } from "../../config";

const AddCardForm = (props) => {
  const { getTokenSilently } = useAuth0();
  const listId = props.listId;
  const openClose = props.handler;
  const [name, setName] = useState("");
  const [data, setData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getTokenSilently();
    const res = await fetch(`${api}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        listId: listId,
        name: name,
        data: data,
      }),
    });
    if (res.ok) {
      const result = await res.json();
      props.setCards([...props.cards, result.card]);
      openClose();
    } else {
      alert("You gotta name that card, homie");
    }
  };

  return (
    <form className={styles.add_card_form} onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        className={styles.add_card_form__name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name that card, my bud"
        autoFocus
      ></input>
      <input
        type="text"
        className={styles.add_card_form__data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Give that card some details"
      ></input>
      <div className={styles.add_card_form__submit_exit}>
        <button className={styles.add_card_form__button} type="submit">
          Add Card
        </button>
        <img
          className={styles.add_card_form__exit}
          onClick={() => openClose()}
          src={require("../../images/x-mark.png")}
          alt="Exit"
        ></img>
      </div>
    </form>
  );
};

export default withRouter(AddCardForm);
