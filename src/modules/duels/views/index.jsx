import React from "react";
import Store from "../provider/duelProvider";
import Mode from "../components/selectionMode";
import Vs from "./vs";
import Board from "./board";
import { useLocation } from "react-router-dom";
import "../components/css/duel.css";

import "../components/css/boardV1.css";

const views = {
  "/duels": <Mode />,
  "/duels/vsplayer": <Vs />,
};

const DuelMode = () => {
  const location = useLocation();
  return views[location.pathname];
};

function Wraper() {
  return (
    <Store.DuelProvider>
      <DuelMode></DuelMode>
      {/* <Board/> */}
    </Store.DuelProvider>
  );
}

export default Wraper;
