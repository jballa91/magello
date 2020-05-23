import React, { lists, setLists, useContext } from "react";
import { withRouter } from "react-router-dom";
import { useAuth0 } from "../../magello-spa";

import styles from "../../styles/delete_card/CardDeleteForm.module.css";
import { api } from "../../config";

import AppContext from "../AppContext";

const CardDeleteForm = (props) => {
  const { getTokenSilently } = useAuth0();
  const cardId = props.id;
  const openClose = props.handler;
  const { lists, setLists } = useContext(AppContext);
  console.log(props);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await getTokenSilently();
    const res = await fetch(`${api}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: cardId,
      }),
    });
    if (res.ok) {
      const newCards = [...props.cards].filter((el) => el.id !== cardId);
      props.setCards(newCards);
      const newLists = lists;
      newLists[props.listIndex].Cards = newLists[props.listIndex].Cards.filter(
        (el) => el.id !== cardId
      );
      setLists([...newLists]);
    } else {
      alert("Yo you can't delete that card, but good job getting here");
    }
  };

  return (
    <form
      className={styles.delete_card__form}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className={styles.delete_card__text_container}>
        <h1 className={styles.delete_card__text}>
          Are you sure you want to delete this card?
        </h1>
      </div>
      <div className={styles.delete_card__submit_exit_container}>
        <button className={styles.delete_card__submit} type="submit">
          Delete
        </button>
        <img
          className={styles.delete_card__exit}
          onClick={() => openClose()}
          //   onClick={openClose}
          src={require("../../images/x-mark.png")}
          alt="Exit"
        ></img>
      </div>
    </form>
  );
};

export default withRouter(CardDeleteForm);
