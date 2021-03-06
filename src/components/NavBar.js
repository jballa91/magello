import React, { useState, useEffect } from "react";
import { useAuth0 } from "../magello-spa";

import { Link, withRouter } from "react-router-dom";

import styles from "../styles/NavBar.module.css";

const NavBar = (props) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [color, setColor] = useState();

  useEffect(() => {
    if (
      props.location.pathname === "/" ||
      props.location.pathname === "/profile" ||
      props.location.pathname === "/external-api" ||
      props.location.pathname === "/board-templates"
    ) {
      setColor("#58b1cc");
    } else {
      setColor(null);
    }
  }, [props]);

  return (
    <div className={styles.navbar} style={{ backgroundColor: color }}>
      <Link to="/" className={styles.navbar_left}>
        <img src={require("../images/ship1.gif")} alt={"Logo"} />
        <h1 className={styles.logo_text}>magello</h1>
      </Link>
      <div className={styles.navbar_right}>
        {isAuthenticated && (
          <span className={styles.navlist}>
            <Link to="/" className={styles.navlink}>
              Home
            </Link>
            <Link to="/profile" className={styles.navlink}>
              Profile
            </Link>
            <Link to="/external-api" className={styles.navlink}>
              External API
            </Link>
          </span>
        )}
        <div>
          {!isAuthenticated && (
            <button
              className={styles.logBtn}
              onClick={() => loginWithRedirect({})}
            >
              Log in
            </button>
          )}
          {isAuthenticated && (
            <button className={styles.logBtn} onClick={() => logout()}>
              Log out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(NavBar);
