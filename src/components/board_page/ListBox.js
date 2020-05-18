import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useAuth0 } from "../../magello-spa";
import { api } from "../../config";

import CardBox from "./CardBox";
import AddCard from "../add_card/AddCard";

import styles from "../../styles/board_page/ListBox.module.css";

const ListBox = (props) => {
  const { getTokenSilently, user } = useAuth0();
  const id = props.id;
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function getCards(id) {
      const token = await getTokenSilently();
      const res = await fetch(`${api}/lists/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let { cards } = await res.json();
      setCards(cards);
    }
    getCards(id);
  }, []);

  return (
    <>
      <div className={styles.list_box}>
        <h1 className={styles.list_box_name}>{`${props.name}`}</h1>
        <Droppable droppableId={`${id}`}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.container}
            >
              {cards.map((card, i) => (
                <CardBox {...card} key={card.id} index={i} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <AddCard cards={cards} setCards={setCards} listId={id} />
      </div>
    </>
  );
};

export default ListBox;
