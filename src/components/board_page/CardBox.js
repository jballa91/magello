import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useAuth0 } from "../../magello-spa";

import CardInfo from "./CardInfo";

import styles from "../../styles/board_page/CardBox.module.css";
import CardDeleteForm from "../card_delete/CardDeleteForm";

const CardBox = (props) => {
  const { getTokenSilently } = useAuth0();
  const id = props.id;
  const [data, setData] = useState("");
  const [modToggle, setModToggle] = useState(false);
  const [open, setOpen] = useState(false);
  // console.log(id);

  useEffect(() => {
    setData(props.data);
  }, []);

  const handleClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(true);
  };

  if (data) {
    return (
      <>
        {modToggle ? (
          <CardInfo
            name={props.name}
            data={props.data}
            modToggle={modToggle}
            setModToggle={setModToggle}
          />
        ) : null}
        {open ? (
          <CardDeleteForm handler={setOpen} open={open} {...props} />
        ) : (
          <Draggable draggableId={`${id}`} index={props.index}>
            {(provided) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                className={styles.card_box}
                onClick={() => setModToggle(true)}
              >
                <h3 className={styles.card_name}>{props.name}</h3>
                <div className={styles.card__details_delete}>
                  <img
                    className={styles.card_details_icon}
                    alt="Card details"
                    src={require("../../images/details.png")}
                  />
                  <button
                    onClick={(e) => handleClick(e)}
                    className={styles.card__delete_button}
                  >
                    Delete
                  </button>
                  {/* <img
                    className={styles.card__delete_button}
                    onClick={(e) => handleClick(e)}
                    src={require("../../images/x-mark-red.png")}
                    alt="delete card"
                  ></img> */}
                </div>
              </div>
            )}
          </Draggable>
        )}
      </>
    );
  }

  return (
    <>
      {open ? (
        <CardDeleteForm handler={setOpen} open={open} {...props} />
      ) : (
        <Draggable draggableId={`${id}`} index={props.index}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className={styles.card_box_2}
            >
              <h3 className={styles.card_name}>{props.name}</h3>
              <button
                onClick={(e) => handleClick(e)}
                className={styles.card__delete_button}
              >
                Delete
              </button>
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};

export default CardBox;
