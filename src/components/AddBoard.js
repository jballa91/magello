import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import AddBoardButton from "./AddBoardButton";
import AddBoardForm from "./AddBoardForm";

import styles from "../styles/AddBoard.module.css";

const AddBoard = (props) => {
  console.log(props);
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.add_board__container}>
      {open ? (
        <AddBoardForm
          handler={setOpen}
          boards={props.boards}
          setBoards={props.setBoards}
        />
      ) : (
        <AddBoardButton handler={setOpen} />
      )}
    </div>
  );
};

export default withRouter(AddBoard);
