import React from "react";
import { withRouter } from "react-router-dom";
import { useAuth0 } from "../../magello-spa";

import styles from "../../styles/delete_list/ListDeleteForm.module.css";
import { api } from "../../config";

const ListDeleteForm = (props) => {
  const { getTokenSilently } = useAuth0();
  const listId = props.id;
  const openClose = props.handler;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await getTokenSilently();
    const res = await fetch(`${api}/lists/${listId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: listId,
      }),
    });
    if (res.ok) {
      const newLists = [...props.lists].filter((el) => el.id !== listId);

      props.setLists(newLists);
    }
  };

  return (
    <form
      className={styles.delete_list__form}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className={styles.delete_list__text_container}>
        <h1 className={styles.delete_list__text}>
          Are you sure you want to delete this list?
        </h1>
      </div>
      <div className={styles.delete_list__submit_exit_container}>
        <button className={styles.delete_list__submit} type="submit">
          Delete
        </button>
        <img
          className={styles.delete_list__exit}
          onClick={(e) => openClose(e)}
          src={require("../../images/x-mark.png")}
          alt="Exit"
        ></img>
      </div>
    </form>
  );
};

export default withRouter(ListDeleteForm);
