import React, { useEffect, useState } from "react";
import { useAuth0 } from "../magello-spa";

import ListBox from "./ListBox";
import AddList from "./AddList";

import styles from "../styles/BoardPage.module.css";

const BoardPage = (props) => {
  const { loading, user, getTokenSilently } = useAuth0();
  const id = props.match.params.id;

  const [lists, setLists] = useState([]);
  const [board, setBoard] = useState({});

  useEffect(() => {
    async function getLists(id) {
      const token = await getTokenSilently();
      const res = await fetch(
        `https://arcane-fortress-89738.herokuapp.com/boards/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let { board, lists } = await res.json();
      setLists(lists);
      setBoard(board);
    }
    getLists(id);
  }, [user]);

  if (loading) {
    return (
      <img
        src={require("../images/magellogo.gif")}
        alt="loading"
        height="100px"
        width="100px"
      />
    );
  }

  return (
    <div
      className={styles.boardpage_page}
      style={{ backgroundColor: board.backgroundColor }}
    >
      <div className={styles.boardpage_container}>
        {lists.map((list) => {
          return <ListBox {...list} key={list.id} />;
        })}
        <AddList lists={lists} setLists={setLists} />
      </div>
    </div>
  );
};

export default BoardPage;
