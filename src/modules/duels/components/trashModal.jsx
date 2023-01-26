import React, { useContext } from "react";
import Store from "../provider/duelProvider";

function TrashModal({ children }) {
  const { states, hooks } = useContext(Store.DuelContext);
  const { boardOne, showTrashModal } = states;
  const [showModal, setShowModal] = showTrashModal;

  const [boardOneState, setBoardOneState] = boardOne;

  const modal = (
    <div className="trash--modal " id="trash_modal_id">
      <span className="text-light" onClick={() => setShowModal(false)}>
        X
      </span>
      {boardOneState.trash.map((card, index) => {
        return (
          <div>
            <span className="text-light">{index + 1}</span>
            <img src={card._image.route} className="field--card__image" />
          </div>
        );
      })}
    </div>
  );

  return <>{showModal && modal}</>;
}

export default TrashModal;
