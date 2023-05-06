import React, { useContext, useEffect, useState } from "react";
import MessageAlert from "../../../components/messageAlert";
import Store from "../provider/duelProvider";

const PhaseAlert = () => {
  const [active, setActive] = useState(0);
  const [style, setStyle] = useState({});

  const { states } = useContext(Store.DuelContext);
  const { gameState } = states;

  const classNames = {
    yourTurn: "phaseAlert phaseAlert--yourTurn",
    opponentTurn: "phaseAlert phaseAlert--opponentTurn",
  };

  useEffect(() => {
    setStyle({
      left: "-45vw",
    });
  }, []);

  return (
    <MessageAlert
      message="test"
      className={classNames.yourTurn}
      style={style}
    />
  );
};

export default PhaseAlert;
