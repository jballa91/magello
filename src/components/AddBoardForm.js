import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useAuth0 } from "../magello-spa";

import styles from "../styles/AddBoardForm.module.css";
import { api } from "../config";

const AddBoardForm = (props) => {
  const { user, getTokenSilently } = useAuth0();
  const userId = user.id;
  const openClose = props.handler;
  const [text, setText] = useState("");
  const [selectColor, setSelectColor] = useState("#CDD1DE");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.length > 0) {
      const token = await getTokenSilently();
      const res = await fetch(`${api}/boards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          name: text,
          backgroundColor: selectColor,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        props.setBoards([...props.boards, result.board]);
        openClose();
      } else {
        alert("You gotta name that board, bro");
      }
    }
  };

  const doIt = async (e) => {
    e.preventDefault();
    setSelectColor(e.target.value);
  };

  return (
    <form className={styles.add_board_form} onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        className={styles.add_board_form__text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Name that board my man"
        autoFocus
      ></input>
      <div className={styles.add_board_form__color_submit_exit}>
        <select
          className={styles.add_board_form__select_color}
          style={{ backgroundColor: selectColor }}
          onChange={doIt}
        >
          <option
            style={{ backgroundColor: "#CDD1DE", color: "black" }}
            value="#CDD1DE"
          >
            Lavender Gray
          </option>
          <option
            style={{ backgroundColor: "#FFD791", color: "black" }}
            value="#FFD791"
          >
            Deep Champagne
          </option>
          <option
            style={{ backgroundColor: "#FE938C", color: "black" }}
            value="#FE938C"
          >
            Congo Pink
          </option>
          <option
            style={{ backgroundColor: "#F686BD", color: "black" }}
            value="#F686BD"
          >
            Persian Pink
          </option>
          <option
            style={{ backgroundColor: "#CD9FCC", color: "black" }}
            value="#CD9FCC"
          >
            Liliac
          </option>
          <option
            style={{ backgroundColor: "#967AA1", color: "black" }}
            value="#967AA1"
          >
            Mt. Purp Majesty
          </option>
          <option
            style={{ backgroundColor: "#6F7D8C", color: "black" }}
            value="#6F7D8C"
          >
            Slate Gray
          </option>
          <option
            style={{ backgroundColor: "#50808E", color: "black" }}
            value="#50808E"
          >
            Teal Blue
          </option>
          <option
            style={{ backgroundColor: "#7F675B", color: "black" }}
            value="#7F675B"
          >
            Raw Umber
          </option>
          <option
            style={{ backgroundColor: "#BF4342", color: "black" }}
            value="#BF4342"
          >
            Deep Chestnut
          </option>
          <option
            style={{ backgroundColor: "#8C1C13", color: "white" }}
            value="#8C1C13"
          >
            Dark Red
          </option>
          <option
            style={{ backgroundColor: "#285943", color: "white" }}
            value="#285943"
          >
            Green
          </option>
          <option
            style={{ backgroundColor: "#192A51", color: "white" }}
            value="#192A51"
          >
            Space Cadet
          </option>

          <option
            style={{ backgroundColor: "#4B2E39", color: "white" }}
            value="#4B2E39"
          >
            Eggplant
          </option>
          <option
            style={{ backgroundColor: "#32021F", color: "white" }}
            value="#32021F"
          >
            Dark Purple
          </option>
        </select>
        <button className={styles.add_board_form__button} type="submit">
          Add Board
        </button>
        <img
          className={styles.add_board_form__exit}
          onClick={() => openClose()}
          src={require("../images/x-mark.png")}
          alt="Exit"
        ></img>
      </div>
    </form>
  );
};

export default withRouter(AddBoardForm);
