import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import AddCardButton from "./AddCardButton";
import AddCardForm from "./AddCardForm";

import styles from "../../styles/add_card/AddCard.module.css";

const AddCard = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.add_card__container}>
      {open ? (
        <AddCardForm
          handler={setOpen}
          cards={props.cards}
          setCards={props.setCards}
          listId={props.listId}
        />
      ) : (
        <AddCardButton handler={setOpen} />
      )}
    </div>
  );
};

export default withRouter(AddCard);
