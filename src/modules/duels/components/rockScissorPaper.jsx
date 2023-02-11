import React from "react";
import ContainerFluidDark from "../../../components/containerFluidDark";
import {
  FaRegHandRock,
  FaRegHandScissors,
  FaRegHandPaper,
} from "react-icons/fa";

const RockScissorsPaperContainer = ({ children }) => {
  return <div className="rockScissorsPaperContainer--box">{children}</div>;
};

const RockScissorsPaperContainerItem = ({ children }) => {
  return (
    <div className="rockScissorsPaperContainer--box__item">{children}</div>
  );
};

const Message = ({ children }) => (
  <h1 className="text-light text-center rockScissorsPaperContainer--box__item--message">
    {children}
  </h1>
);

function RockScissorPaper() {
  const [message, setMessage] = React.useState("Choose your weapon");

  return (
    <>
      <div className="rockScissorsPaperContainer">
        <RockScissorsPaperContainer>
          <RockScissorsPaperContainerItem>
            <FaRegHandScissors></FaRegHandScissors>
          </RockScissorsPaperContainerItem>
          <RockScissorsPaperContainerItem>
            <FaRegHandRock></FaRegHandRock>
          </RockScissorsPaperContainerItem>
          <RockScissorsPaperContainerItem>
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
