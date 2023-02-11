import React from "react";
import ContainerFluidDark from "../../../components/containerFluidDark";
import Card from "../../../components/containerFluidDark";
import {
  FaRegHandRock,
  FaRegHandScissors,
  FaRegHandPaper,
} from "react-icons/fa";

const style = {
  padding: "1rem",
};

const Div = ({ children }) => {
  const style = {
    with: "100%",
    height: "20vh",
  };

  return <div style={style}>{children}</div>;
};

function RockScisorPaper() {
  return (
    <>
      <div className="rockScirsorPaperContainter">
        <div className="rockScirsorPaperContainter--box">
          <div className="rockScirsorPaperContainter--box__item">
            <FaRegHandScissors className="text-light"></FaRegHandScissors>
          </div>
          <div className="rockScirsorPaperContainter--box__item">
            <FaRegHandRock className="text-light"></FaRegHandRock>
          </div>
          <div className="rockScirsorPaperContainter--box__item">
            <FaRegHandPaper className="text-light"></FaRegHandPaper>
          </div>
        </div>
        <div className="rockScirsorPaperContainter--box">
          <div className="rockScirsorPaperContainter--box__item">
            <FaRegHandScissors className="text-light"></FaRegHandScissors>
          </div>
          <div className="rockScirsorPaperContainter--box__item">
            <FaRegHandRock className="text-light"></FaRegHandRock>
          </div>
          <div className="rockScirsorPaperContainter--box__item">
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
      <RockScisorPaper />
    </ContainerFluidDark>
  );
}

export default wrapper;
