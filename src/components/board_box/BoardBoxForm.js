import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useAuth0 } from "../../magello-spa";

import styles from "../../styles/board_box/BoardBoxForm.module.css";
import { api } from "../../config";

const BoardBoxForm = (props) => {
  const { user, getTokenSilently } = useAuth0();
  const boardId = props.board.id;
  console.log(props);
  const openClose = props.handler;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getTokenSilently();
    const res = await fetch(`${api}/boards`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        boardId: boardId,
      }),
    });
    if (res.ok) {
      const newBoards = [...props.boards];
      newBoards.pop();
      props.setBoards(newBoards);
    } else {
      alert("Yo you can't delete that board, but good job getting here");
    }
  };

  return (
    <form className={styles.board_box_form} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.board_box_form__text_container}>
        <h1 className={styles.board_box_form__text}>
          Are you sure you want to delete this board?
        </h1>
      </div>
      <div className={styles.board_box_form__submit_exit_container}>
        <button className={styles.board_box_form__submit} type="submit">
          Delete
        </button>
        <img
          className={styles.board_box_form__exit}
          onClick={() => openClose()}
          src={require("../../images/x-mark-white.png")}
          alt="Exit"
        ></img>
      </div>
    </form>
  );
};

export default withRouter(BoardBoxForm);
