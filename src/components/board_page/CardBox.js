import React, { useEffect, useState, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import CardInfo from "./CardInfo";

import styles from "../../styles/board_page/CardBox.module.css";
import CardDeleteForm from "../card_delete/CardDeleteForm";

const CardBox = (props) => {
  const id = props.id;
  const [data, setData] = useState("");
  const [modToggle, setModToggle] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const handleClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(true);
  };

  const Container = styled.div`
    background-color: ${(props) => (props.isDragging ? "#A9A9A9" : "#F5F5F5")};
    opacity: ${(props) => (props.isDragging ? 0.7 : 1)};
  `;

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
            {(provided, snapshot) => (
              <Container
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
                className={styles.card_box}
              >
                <h3 className={styles.card_name}>{props.name}</h3>
                <div className={styles.card__details_delete}>
                  <div
                    className={styles.extend}
                    onClick={() => setModToggle(true)}
                  >
                    <i class="fas fa-list"></i>
                  </div>

                  {/* <img
                    className={styles.card_details_icon}
                    alt="Card details"
                    src={require("../../images/details.png")}
                  /> */}
                  {/* <button
                    onClick={(e) => handleClick(e)}
                    className={styles.card__delete_button}
                  >
                    Delete
                  </button> */}
                  <div
                    className={styles.card__delete_button}
                    onClick={(e) => handleClick(e)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </div>
                  {/* <img
                    className={styles.card__delete_button}
                    onClick={(e) => handleClick(e)}
                    src={require("../../images/x-mark-red.png")}
                    alt="delete card"
                  ></img> */}
                </div>
              </Container>
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
              {/* <button
                onClick={(e) => handleClick(e)}
                className={styles.card__delete_button}
              >
                Delete
              </button> */}
              <div
                className={styles.card__delete_button}
                onClick={(e) => handleClick(e)}
              >
                <i className="fas fa-trash-alt"></i>
              </div>
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};

export default CardBox;
