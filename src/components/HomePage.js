import React, { useEffect, useState } from "react";
import { Switch, Link, Router } from "react-router-dom";
import { useAuth0 } from "../magello-spa";
import PrivateRoute from "./PrivateRoute";
import HomePageBoards from "./HomePageBoards";
import styles from "../styles/HomePage.module.css";
import { api } from "../config";

const HomePage = () => {
  const { loading, user, getTokenSilently } = useAuth0();
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    if (!user) {
      return;
    }
    async function getBoards(id) {
      const token = await getTokenSilently();
      const res = await fetch(`${api}/users/${id}/boards`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
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
          <li>
            <Link to="/">Boards</Link>
          </li>
          <li>
            <Link to="/board-templates">Templates</Link>
          </li>
        </ul>
      </div>
      <div className={styles.homepage_right}>
        <Switch>
          <PrivateRoute path="/board-templates">
            <HomePageBoards boards={boards} title="Templates" />
          </PrivateRoute>
          <PrivateRoute exact path="/">
            <HomePageBoards
              boards={boards}
              setBoards={setBoards}
              title="Personal Boards"
            />
          </PrivateRoute>
        </Switch>
      </div>
    </div>
  );
};

export default HomePage;
