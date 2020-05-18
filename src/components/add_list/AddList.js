import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import AddListButton from "./AddListButton";
import AddListForm from "./AddListForm";

import styles from "../../styles/add_list/AddList.module.css";

const AddList = (props) => {
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
