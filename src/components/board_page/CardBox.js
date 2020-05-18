import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useAuth0 } from "../../magello-spa";

import CardInfo from "./CardInfo";

import styles from "../../styles/board_page/CardBox.module.css";

const CardBox = (props) => {
  const { getTokenSilently } = useAuth0();
  const id = props.id;
  const [data, setData] = useState("");
  const [modToggle, setModToggle] = useState(false);
  // console.log(id);

  useEffect(() => {
    setData(props.data);
  }, []);

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
              <img
                className={styles.card_details_icon}
                alt="Card details"
                src={require("../../images/details.png")}
              />
            </div>
          )}
        </Draggable>
      </>
    );
  }

  return (
    <Draggable draggableId={`${id}`} index={props.index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={styles.card_box}
        >
          <h3 className={styles.card_name}>{props.name}</h3>
        </div>
      )}
    </Draggable>
  );
};

export default CardBox;
