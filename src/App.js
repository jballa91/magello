import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";

import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import SplashPage from "./components/SplashPage";
import HomePage from "./components/HomePage";
import BoardPage from "./components/BoardPage";
import Profile from "./components/Profile";
import ExternalApi from "./views/ExternalApi";

import styles from "./styles/App.module.css";

import { useAuth0 } from "./magello-spa";
function App() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <div className="App">
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <div className={styles.page_container}>
          <Switch>
            <PrivateRoute path="/boards/:id" component={BoardPage} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/external-api" component={ExternalApi} />
            {!isAuthenticated && (
              <Route exact path="/" component={SplashPage} />
            )}
            {isAuthenticated && <PrivateRoute path="/" component={HomePage} />}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
