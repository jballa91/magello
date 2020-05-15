import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useAuth0 } from "../magello-spa";

import styles from "../styles/AddListForm.module.css";
import { api } from "../config";

const AddListForm = (props) => {
  const { getTokenSilently } = useAuth0();
  const boardId = props.match.params.id;
  const openClose = props.handler;
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.length > 0) {
      const token = await getTokenSilently();
      const res = await fetch(`${api}/lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          boardId: boardId,
          name: text,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        props.setLists([...props.lists, result.list]);
        openClose();
      }
    } else {
      alert("You gotta name that list, bro");
    }
  };

  return (
    <form className={styles.add_list_form} onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        className={styles.add_list_form__text}
        onChange={(e) => setText(e.target.value)}
        placeholder="List Name"
      ></input>
      <div className={styles.add_list_form__submit_exit}>
        <button className={styles.add_list_form__button} type="submit">
          Add List
        </button>
        <img
          className={styles.add_list_form__exit}
          onClick={() => openClose()}
          src={require("../images/x-mark.png")}
          alt="Exit"
        ></img>
      </div>
    </form>
  );
};

export default withRouter(AddListForm);
