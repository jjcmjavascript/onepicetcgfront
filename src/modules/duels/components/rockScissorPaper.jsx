import { useState, useContext } from "react";
import Store from "../provider/duelProvider";

import ContainerFluidDark from "../../../components/containerFluidDark";
import {
  FaRegHandRock,
  FaRegHandScissors,
  FaRegHandPaper,
} from "react-icons/fa";

import constants from "../constants/socketEvents";

const RockScissorsPaperContainer = ({ children }) => {
  return <div className="rockScissorsPaperContainer--box">{children}</div>;
};

const RockScissorsPaperContainerItem = ({ children, onClick, active }) => {
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
  const [message] = useState("Choose your weapon");

  const onClick = (choice) => {
    setChoice(choice);
    duelSocket.emit(constants.GAME_ROCK_PAPER_SCISSORS_CHOICE, {
      room: duelRoom,
      choice,
    });
  };

  if (duelSocket) {
    duelSocket.on(constants.GAME_ROCK_SCISSORS_PAPER_RESULT, () => {
      setChoice(null);
    });
  }

  return (
    <>
      <div className="rockScissorsPaperContainer">
        <RockScissorsPaperContainer>
          <RockScissorsPaperContainerItem
            onClick={() => !choice && onClick("scissors")}
            active={choice == "scissors"}
          >
            <FaRegHandScissors></FaRegHandScissors>
          </RockScissorsPaperContainerItem>

          <RockScissorsPaperContainerItem
            onClick={() => !choice && onClick("rock")}
            active={choice == "rock"}
          >
            <FaRegHandRock></FaRegHandRock>
          </RockScissorsPaperContainerItem>

          <RockScissorsPaperContainerItem
            onClick={() => !choice && onClick("paper")}
            active={choice == "paper"}
          >
            <FaRegHandPaper></FaRegHandPaper>
          </RockScissorsPaperContainerItem>
        </RockScissorsPaperContainer>

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
