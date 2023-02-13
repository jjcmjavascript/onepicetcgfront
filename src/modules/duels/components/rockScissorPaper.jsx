import React, { useState, useContext } from "react";
import Store from "../provider/duelProvider";
import { emitRockScissorsPaperChoice } from "../services/socketEvents";

import ContainerFluidDark from "../../../components/containerFluidDark";
import {
  FaRegHandRock,
  FaRegHandScissors,
  FaRegHandPaper,
} from "react-icons/fa";

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

const Message = ({ children, active }) => {
  const className = `text-light text-center rockScissorsPaperContainer--box__item--message`;
  return <h1 className={className}>{children}</h1>;
};

function RockScissorPaper() {
  const { hooks } = useContext(Store.DuelContext);
  const { sockets } = hooks;
  const { duelSocket, duelRoom } = sockets;

  const [choice, setChoice] = useState(null);
  const [message, setMessage] = useState("Choose your weapon");

  const onClick = (choice) => {
    setChoice(choice);
    emitRockScissorsPaperChoice(duelSocket, {
      room: duelRoom,
      choice,
    });
  };

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
  const style = {
    top: "50vh",
  };

  return (
    <ContainerFluidDark>
      <RockScissorPaper />
    </ContainerFluidDark>
  );
}

export default wrapper;
