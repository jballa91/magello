import React, { useEffect, useState } from "react";
import { useAuth0 } from "../magello-spa";

import ListBox from "./ListBox";

import styles from "../styles/BoardPage.module.css";

const BoardPage = (props) => {
  const { loading, user, getTokenSilently } = useAuth0();
  const id = props.match.params.id;

  const [lists, setLists] = useState([]);

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
      let { lists } = await res.json();
      setLists(lists);
    }

    getLists(id);
  }, [user]);

  return (
    <>
      {lists.map((list) => {
        return <ListBox {...list} key={list.id} />;
      })}
    </>
  );
};

export default BoardPage;
