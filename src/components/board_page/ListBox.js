import React, { useEffect, useState, useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useAuth0 } from "../../magello-spa";
import { api } from "../../config";

import CardBox from "./CardBox";
import AddCard from "../add_card/AddCard";
import ListDeleteForm from "../list_delete/ListDeleteForm";

import styles from "../../styles/board_page/ListBox.module.css";
import AppContext from "../AppContext";

const ListBox = (props) => {
  const { getTokenSilently } = useAuth0();
  const id = props.list.id;
  const index = props.list.index;
  const [cards, setCards] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { lists, setLists } = useContext(AppContext);
  const list = lists[index];

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
        <AppContext.Consumer>
          {() => (
            <div className={styles.list_box}>
              <div className={styles.list_box__name_delete}>
                <h1 className={styles.list_box_name}>{`${props.list.name}`}</h1>
                <button
                  onClick={(e) => handleClick(e)}
                  className={styles.list_box__delete_button}
                >
                  Delete
                </button>
              </div>
              <Droppable droppableId={`${props.index}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isdraggingover={snapshot.isDraggingOver.toString()}
                    className={styles.container}
                  >
                    {list.Cards.map((card, i) => (
                      <CardBox
                        {...card}
                        key={card.id}
                        index={i}
                        setCards={setCards}
                        cards={cards}
                        listIndex={index}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <AddCard
                cards={cards}
                setCards={setCards}
                listId={id}
                listIndex={index}
              />
            </div>
          )}
        </AppContext.Consumer>
      )}
    </>
  );
};

export default ListBox;
