import { useState, useContext } from "react";
import Store from "../provider/duelProvider";

import ContainerFluidDark from "../../../components/containerFluidDark";
import { FaHandMiddleFinger, FaRegHandScissors } from "react-icons/fa";

import constants from "../constants/socketEvents";

const TurnSelectorContainer = ({ children }) => {
  return <div className="turnSelector--box">{children}</div>;
};

const TurnSelectorItem = ({ children, onClick, active }) => {
  const activeEffect = active
    ? "rockScissorsPaperContainer--box__item_active"
    : "";

  const className = `rockScissorsPaperContainer--box__item ${activeEffect}`;

  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

const Message = ({ children }) => {
  const className = `text-light text-center rockScissorsPaperContainer--box__item--message`;
  return <h1 className={className}>{children}</h1>;
};

function RockScissorPaper() {
  const { hooks } = useContext(Store.DuelContext);
  const { sockets } = hooks;
  const { duelSocket, duelRoom } = sockets;

  const [choice, setChoice] = useState(null);
  const [message] = useState("Choose your Turn");

  const onClick = (choice) => {
    setChoice(choice);
    console.log(constants.GAME_TURN_SELECTION_CHOICE);

    duelSocket.emit(constants.GAME_TURN_SELECTION_CHOICE, {
      room: duelRoom,
      choice,
    });
  };

  return (
    <>
      <div className="rockScissorsPaperContainer">
        <TurnSelectorContainer>
          <TurnSelectorItem
            onClick={() => !choice && onClick("first")}
            active={choice == "first"}
          >
            <FaHandMiddleFinger></FaHandMiddleFinger>
          </TurnSelectorItem>

          <TurnSelectorItem
            onClick={() => !choice && onClick("second")}
            active={choice == "second"}
          >
            <FaRegHandScissors className="rotate85"></FaRegHandScissors>
          </TurnSelectorItem>
        </TurnSelectorContainer>

        <Message> {message}</Message>
      </div>
    </>
  );
}

function wrapper() {
  return (
    <ContainerFluidDark>
      <RockScissorPaper />
    </ContainerFluidDark>
  );
}

export default wrapper;
