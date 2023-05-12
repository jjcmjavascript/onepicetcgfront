import { useContext, useEffect, useState } from "react";
import MessageAlert from "../../../components/messageAlert";
import Store from "../provider/duelProvider";

const PhaseAlert = () => {
  const [style, setStyle] = useState({});

  const { states } = useContext(Store.DuelContext);
  const { gameState } = states;

  console.log(gameState);

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
