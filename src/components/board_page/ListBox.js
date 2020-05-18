import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useAuth0 } from "../../magello-spa";
import { api } from "../../config";

import CardBox from "./CardBox";
import AddCard from "../add_card/AddCard";
import ListDeleteForm from "../list_delete/ListDeleteForm";

import styles from "../../styles/board_page/ListBox.module.css";

const ListBox = (props) => {
  const { getTokenSilently } = useAuth0();
  const id = props.id;
  const [cards, setCards] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false);

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
  }, [getTokenSilently, id]);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteOpen(!deleteOpen);
  };

  return (
    <>
      {deleteOpen ? (
        <ListDeleteForm
          handler={handleClick}
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          id={id}
          lists={props.lists}
          setLists={props.setLists}
        />
      ) : (
        <div className={styles.list_box}>
          <div className={styles.list_box__name_delete}>
            <h1 className={styles.list_box_name}>{`${props.name}`}</h1>
            <button
              onClick={(e) => handleClick(e)}
              className={styles.list_box__delete_button}
            >
              Delete
            </button>
          </div>
          <Droppable droppableId={`${id}`}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.container}
              >
                {cards.map((card, i) => (
                  <CardBox
                    {...card}
                    key={card.id}
                    index={i}
                    setCards={setCards}
                    cards={cards}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <AddCard cards={cards} setCards={setCards} listId={id} />
        </div>
      )}
    </>
  );
};

export default ListBox;
