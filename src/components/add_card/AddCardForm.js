import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { useAuth0 } from "../../magello-spa";

import styles from "../../styles/add_card/AddCardForm.module.css";
import { api } from "../../config";

import AppContext from "../AppContext";

const AddCardForm = (props) => {
  const { getTokenSilently } = useAuth0();
  const listId = props.listId;
  const listIndex = props.listIndex;
  const openClose = props.handler;
  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const { lists, setLists } = useContext(AppContext);
  console.log(listIndex);
  console.log(props.cards);
  const list = lists[listIndex];

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
        index: props.cards.length,
      }),
    });
    if (res.ok) {
      const result = await res.json();
      props.setCards([...props.cards, result.card]);
      const newLists = lists;
      newLists[listIndex].Cards = [...props.cards, result.card];
      console.log(newLists);
      setLists([...newLists]);
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
