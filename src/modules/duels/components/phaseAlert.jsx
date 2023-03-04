import React, { useContext } from "react";
import MessageAlert from "../../../components/messageAlert";
import Store from "../provider/duelProvider";

const PhaseAlert = () => {
  const { states } = useContext(Store.DuelContext);
  const classNames = {
    yourTurn: "phaseAlert phaseAlert--yourTurn",
    opponentTurn: "phaseAlert phaseAlert--opponentTurn",
  }

  return <MessageAlert message="test" className={classNames.opponentTurn}/>;
};

export default PhaseAlert;
