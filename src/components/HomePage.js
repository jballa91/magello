import React from "react";
// import { Link } from "react-router-dom";
import { useAuth0 } from "../magello-spa";

import HomePageBoards from "./HomePageBoards";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
  const { loading } = useAuth0();

  if (loading) {
    return (
      <img
        src={"../images/magellogo.gif"}
        alt="loading"
        height="400px"
        width="400px"
      />
    );
  }

  return (
    <div className={styles.homepage_container}>
      <div className={styles.homepage_left}>
        <ul className={styles.homepage_nav}>
          <li className={styles.hompage_nav_item}>Boards</li>
        </ul>
      </div>
      <div className={styles.hompage_right}>
        <h3 className={styles.boards_header}>Personal Boards</h3>
        <HomePageBoards />
      </div>
    </div>
  );
};

export default HomePage;
