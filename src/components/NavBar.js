import React from "react";
import { useAuth0 } from "../magello-spa";

import { Link } from "react-router-dom";

import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_left}>
        <img src={require("../images/ship1.gif")} alt={"Logo"} />
        <h1 className={styles.logo_text}>Magello</h1>
      </div>
      <div className={styles.navbar_right}>
        {isAuthenticated && (
          <span className={styles.navlist}>
            <Link className={styles.navlink} to="/">
              Home
            </Link>
            <Link className={styles.navlink} to="/profile">
              Profile
            </Link>
            <Link className={styles.navlink} to="/external-api">
              External API
            </Link>
          </span>
        )}
        <div>
          {!isAuthenticated && (
            <button
              className={styles.btn}
              onClick={() => loginWithRedirect({})}
            >
              Log in
            </button>
          )}
          {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
