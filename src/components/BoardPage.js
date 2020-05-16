import React, { useEffect, useState } from "react";
import { useAuth0 } from "../magello-spa";

import ListBox from "./ListBox";
import AddList from "./AddList";

import styles from "../styles/BoardPage.module.css";
import { api } from "../config";

const BoardPage = (props) => {
  const { loading, user, getTokenSilently, isAuthenticated } = useAuth0();
  const boardId = props.match.params.id;
  const [lists, setLists] = useState([]);
  const [board, setBoard] = useState({});

  useEffect(() => {
    async function getLists(boardId) {
      const token = await getTokenSilently();
      const res = await fetch(`${api}/boards/${boardId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let { board, lists } = await res.json();
      setLists(lists);
      setBoard(board);
    }
    getLists(boardId);
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

  if (true) {
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
  }
};

export default BoardPage;
