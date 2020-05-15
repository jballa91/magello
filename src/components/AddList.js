import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useAuth0 } from "../magello-spa";

import AddListButton from "./AddListButton";
import AddListForm from "./AddListForm";

import styles from "../styles/AddList.module.css";

const AddList = (props) => {
  console.log(props.match.params.id);

  const [open, setOpen] = useState(false);

  return (
    <div className={styles.add_list__container}>
      {open ? (
        <AddListForm
          handler={setOpen}
          lists={props.lists}
          setLists={props.setLists}
        />
      ) : (
        <AddListButton handler={setOpen} />
      )}
    </div>
  );
};

export default withRouter(AddList);
