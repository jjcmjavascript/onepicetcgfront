import React, { useContext, useEffect, useRef, useState, memo } from "react";
import Store from "../../../provider/duelProvider";

import TrashModalOptions from "./trashModalOptions";
import TrashModalOptionItem from "./trashModalOptionItem";

function TrashModal({}) {
  const SCAPE_KEY = 27;

  const modalTrashRef = useRef();
  const { states, hooks } = useContext(Store.DuelContext);

  const { boardOne, showTrashModal, preview } = states;
  const [showModal, setShowModal] = showTrashModal;
  const [boardOneState, setBoardOneState] = boardOne;
  const [, setPreview] = preview;
  const [activeCard, setActiveCard] = useState(null);

  const onMouseOver = (card) => {
    setPreview(card);
  };

  const hideOptions = () => {
    if (activeCard) {
      const optionsElement = modalTrashRef.current;
      optionsElement.classList.add("hideFull");
      setActiveCard(null);
    }
  };

  const toggleDeckOptions = (card) => {
    const optionsElement = modalTrashRef.current;
    const cardElement = document.querySelector(`#id_${card.uuid}`);

    if (!activeCard || (activeCard && activeCard.uuid !== card.uuid)) {
      setActiveCard(card);
      optionsElement.style.top = `${cardElement.offsetTop}px`;
      optionsElement.style.left = `${cardElement.offsetLeft}px`;
      optionsElement.classList.remove("hideFull");
    } else {
      hideOptions();
    }
  };

  const putTrashCardOnTopDeck = () => {
    setBoardOneState((prevState) => {
      return {
        ...prevState,
        deck: [activeCard, ...prevState.deck],
        trash: prevState.trash.filter((card) => card.uuid != activeCard.uuid),
      };
    });

    hideOptions();
  };

  const putTrashCardOnBottomDeck = () => {
    setBoardOneState((prevState) => {
      return {
        ...prevState,
        deck: [...prevState.deck, activeCard],
        trash: prevState.trash.filter((card) => card.uuid != activeCard.uuid),
      };
    });

    hideOptions();
  };

  const putTrashCardInHand = () => {
    setBoardOneState((prevState) => {
      return {
        ...prevState,
        trash: prevState.trash.filter((card) => card.uuid != activeCard.uuid),
      };
    });

    // setHand([...currentHand, activeCard]);

    hideOptions();
  };

  const playTrashCardInCharacterArea = () => {
    setBoardOneState((prevState) => {
      return {
        ...prevState,
        trash: prevState.trash.filter((card) => card.uuid != activeCard.uuid),
        characters: [...prevState.characters, activeCard],
      };
    });

    hideOptions();
  };

  useEffect(() => {
    document.querySelector("body").addEventListener("keyup", (evt) => {
      if (evt.keyCode === SCAPE_KEY) {
        setShowModal(false);
      }
    });
  }, []);

  const modal = (
    <div className="trash--modal " id="trash_modal_id">
      <TrashModalOptions ref={modalTrashRef}>
        <TrashModalOptionItem onClick={putTrashCardInHand}>
          A la mano
        </TrashModalOptionItem>
        <TrashModalOptionItem onClick={playTrashCardInCharacterArea}>
          Jugar
        </TrashModalOptionItem>
        <TrashModalOptionItem onClick={putTrashCardOnTopDeck}>
          Colocar en Tope
        </TrashModalOptionItem>
        <TrashModalOptionItem onClick={putTrashCardOnBottomDeck}>
          Colocar en Fondo
        </TrashModalOptionItem>
      </TrashModalOptions>

      <span className="text-light" onClick={() => setShowModal(false)}>
        X
      </span>
      {boardOneState.trash.map((card, index) => {
        return (
          <div
            id={`id_${card.uuid}`}
            onMouseOver={() => onMouseOver(card)}
            key={card.uuid}
            onClick={(_) => toggleDeckOptions(card)}
          >
            <span className="text-light">{index + 1}</span>
            <img src={card._image.route} className="field--card__image" />
          </div>
        );
      })}
    </div>
  );

  return <>{showModal && modal}</>;
}

export default memo(TrashModal);
