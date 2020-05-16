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
  const [owned, setOwned] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getLists(boardId) {
      const token = await getTokenSilently();
      const res = await fetch(`${api}/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        setLoaded(true);
        setOwned(false);
        console.log(owned);
      } else {
        setTimeout(() => setLoaded(true), 1);
        setOwned(true);
        let { board, lists } = await res.json();
        setLists(lists);
        setBoard(board);
      }
    }
    getLists(boardId);
  }, [user, boardId]);

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

  if (!owned && loaded) {
    return (
      <div className={styles.boardpage_container}>
        <div className={styles.nice_try_chump}>
          <h1 className={styles.crimes_like_dimes}>
            Yo yo yo y'all can't stand right here
          </h1>
          <h1 className={styles.crimes_like_dimes}>
            An unauthorized user was the site's worst nightmare
          </h1>
          <h1 className={styles.crimes_like_dimes}>
            Tryna get at other boards stay in your own lanes
          </h1>
          <h1 className={styles.crimes_like_dimes}>
            This game is dangerous, y'all tactics are most strange
          </h1>
        </div>
      </div>
    );
  }

  if (owned && loaded) {
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

  return null;
};

export default BoardPage;
