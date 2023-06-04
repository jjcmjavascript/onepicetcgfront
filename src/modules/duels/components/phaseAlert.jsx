import { useEffect, useState } from "react";
import MessageAlert from "../../../components/messageAlert";

const PhaseAlert = () => {
  const [style, setStyle] = useState({});

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
