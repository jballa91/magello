import React, { useEffect, useState, useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useAuth0 } from "../../magello-spa";

import ListBox from "./ListBox";
import AddList from "../add_list/AddList";

import styles from "../../styles/board_page/BoardPage.module.css";
import { api } from "../../config";
import AppContext from "../AppContext";

const BoardPage = (props) => {
  const { loading, getTokenSilently } = useAuth0();
  const boardId = props.match.params.id;
  // const [lists, setLists] = useState([]);
  const [board, setBoard] = useState({});
  const context = useContext(AppContext);
  const { lists, setLists } = useContext(AppContext);
  const [owned, setOwned] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getLists(boardId) {
      const token = await getTokenSilently();
      const res = await fetch(`${api}/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        setLoaded(true);
        setOwned(false);
      } else {
        setTimeout(() => setLoaded(true), 1);
        setOwned(true);
        let { board, lists } = await res.json();
        setLists(lists);
        setBoard(board);
      }
    }
    getLists(boardId);
  }, [boardId, getTokenSilently]);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //get the list dragged from and dragged to
    const start = lists[source.droppableId];
    const finish = lists[destination.droppableId];

    //if the dragged item is from the dropped list...
    if (start === finish) {
      const list = lists[source.droppableId];
      const cardList = Array.from(list.Cards);
      cardList.splice(source.index, 1);
      cardList.splice(destination.index, 0, list.Cards[source.index]);

      const newList = {
        ...list,
        Cards: cardList,
      };
      const token = await getTokenSilently();
      const crizzards = newList.Cards;

      crizzards.map(async (card, i) => {
        card.index = i;
        const res = await fetch(`${api}/cards/${card.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: card.id,
            index: card.index,
          }),
        });

        // const result = await res.json();
        return;
      });

      const newLists = lists.map((list) => {
        if (list.id === newList.id) {
          return newList;
        } else {
          return list;
        }
      });
      setLists(newLists);
    }

    // if the dropped list is different from start list
    else {
      // gunna need the token for later
      const token = await getTokenSilently();

      // Change startListCards
      const startListCards = Array.from(start.Cards);
      startListCards.splice(source.index, 1);
      const newStartList = {
        ...start,
        Cards: startListCards,
      };

      // do the patch
      const newStartListCardsArray = newStartList.Cards;
      newStartListCardsArray.map(async (card, i) => {
        card.index = i;
        const res = await fetch(`${api}/cards/${card.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: card.id,
            index: card.index,
          }),
        });
        // const result = await res.json();
        return;
      });

      // Change finishListCards
      const finishListCards = Array.from(finish.Cards);
      finishListCards.splice(destination.index, 0, start.Cards[source.index]);
      const newFinishList = {
        ...finish,
        Cards: finishListCards,
      };

      // Do the patch
      const newFinishListCardsArray = newFinishList.Cards;
      newFinishListCardsArray.map(async (card, i) => {
        card.index = i;

        const res = await fetch(`${api}/cards/${card.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: card.id,
            index: card.index,
            listId: newFinishList.id,
          }),
        });
        // const result = await res.json();
        return;
      });

      // Update the state to reflect changes
      const newLists = lists.map((list) => {
        if (list.id === start.id) {
          return newStartList;
        } else if (list.id === finish.id) {
          return newFinishList;
        } else {
          return list;
        }
      });
      setLists(newLists);
    }
  };

  if (loading) {
    return (
      <img
        src={require("../../images/magellogo.gif")}
        alt="loading"
        height="100px"
        width="100px"
      />
    );
  }

  if (owned && loaded) {
    return (
      <div
        className={styles.boardpage_page}
        style={{ backgroundColor: board.backgroundColor }}
      >
        <DragDropContext onDragEnd={onDragEnd} key={board.id}>
          <div className={styles.boardpage_container}>
            {lists.map((list) => {
              return (
                <ListBox
                  list={list}
                  key={list.id}
                  index={list.index}
                  lists={lists}
                  setLists={setLists}
                  boardBG={board.backgroundColor}
                />
              );
            })}
            <AddList lists={lists} setLists={setLists} />
          </div>
        </DragDropContext>
      </div>
    );
  }

  if (!owned && loaded) {
    return (
      <div className={styles.boardpage_container}>
        <div className={styles.nice_try_chump}>
          <h1 className={styles.crimes_like_dimes}>
            Yo yo yo y'all can't stand right here
          </h1>
          <h1 className={styles.crimes_like_dimes}>
            An unauthorized user was the site's worst nightmare
          </h1>
          <h1 className={styles.crimes_like_dimes}>
            Tryna get at other boards stay in your own lanes
          </h1>
          <h1 className={styles.crimes_like_dimes}>
            This game is not only dangerous, y'all tactics most strange
          </h1>
        </div>
      </div>
    );
  }

  return null;
};

export default BoardPage;
