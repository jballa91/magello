import React, { useEffect } from "react";
import { useAuth0 } from "../magello-spa";

import styles from "../styles/ListBox.module.css";

const ListBox = ({ ...props }) => {
  const { loading, user, getTokenSilently } = useAuth0();
  console.log(props);

  return (
    <>
      <div className={styles.list_box}>
        <h1>{`${props.name}`}</h1>
      </div>
    </>
  );
};

export default ListBox;
