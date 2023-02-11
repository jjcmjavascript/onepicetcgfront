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

function RockScissorPaper() {
  return (
    <>
      <div className="rockScissorsPaperContainer">
        <RockScissorsPaperContainer>
          <RockScissorsPaperContainerItem>
            <FaRegHandScissors className="text-light"></FaRegHandScissors>
          </RockScissorsPaperContainerItem>
          <RockScissorsPaperContainerItem>
            <FaRegHandRock className="text-light"></FaRegHandRock>
          </RockScissorsPaperContainerItem>
          <RockScissorsPaperContainerItem>
            <FaRegHandPaper className="text-light"></FaRegHandPaper>
          </RockScissorsPaperContainerItem>
        </RockScissorsPaperContainer>

        <div className="rockScissorsPaperContainer--box">
          <div className="rockScissorsPaperContainer--box__item">
            <FaRegHandScissors className="text-light"></FaRegHandScissors>
          </div>
          <div className="rockScissorsPaperContainer--box__item">
            <FaRegHandRock className="text-light"></FaRegHandRock>
          </div>
          <div className="rockScissorsPaperContainer--box__item">
            <FaRegHandPaper className="text-light"></FaRegHandPaper>
          </div>
        </div>
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
