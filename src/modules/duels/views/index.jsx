import React, { useContext } from "react";
import Store from "../provider/duelProvider";
import Mode from "./selectionMode";
import VsPlayer from "./vsPlayer";
import Board from "./board";
import { useLocation } from 'react-router-dom'

const views = {
  "test" : <Board></Board>,
  "/duels": <Mode />,
  "/duels/vsplayer": <VsPlayer />,
};

const DuelMode = () => {
  const location = useLocation();
  // return views[location.pathname];
  return views["test"];
};

function Wraper() {
  return (
    <Store.DuelProvider>
      <DuelMode />
    </Store.DuelProvider>
  );
}

export default Wraper;
