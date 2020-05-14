import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useAuth0 } from "../magello-spa";

import HomePageBoards from "./HomePageBoards";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
  const { loading, user, getTokenSilently } = useAuth0();
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    async function getBoards(id) {
      const token = await getTokenSilently();
      const res = await fetch(
        `https://arcane-fortress-89738.herokuapp.com/users/${id}/boards`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const boardsArr = await res.json();
      setBoards(boardsArr.boards);
    }

    getBoards(user.id);
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
    <div className={styles.homepage_container}>
      <div className={styles.homepage_left}>
        <ul className={styles.homepage_nav}>
          {/* Gotta make a list of linkies over here */}
        </ul>
      </div>
      <div className={styles.homepage_right}>
        <h3 className={styles.boards_header}>Personal Boards</h3>
        <HomePageBoards boards={boards} />
      </div>
    </div>
  );
};

export default HomePage;
