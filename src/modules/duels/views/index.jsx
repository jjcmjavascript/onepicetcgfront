import React from "react";
import { useLocation } from "react-router-dom";

import Store from "../provider/duelProvider";
import Mode from "../components/selectionMode";
import Vs from "./vs";
import VsPlayer from "../components/vsPlayer";

import "../components/css/duel.css";
import "../components/css/boardV1.css";

const testMode = process.env.REACT_APP_TEST_BOARD;

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
      {testMode ? <VsPlayer /> : <DuelMode />}
    </Store.DuelProvider>
  );
}

export default Wraper;
