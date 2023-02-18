import React from "react";
import Store from "../provider/duelProvider";
import Mode from "./selectionMode";
import Vs from "./vs";
import { useLocation } from "react-router-dom";
import "../components/css/duel.css";

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
    </Store.DuelProvider>
  );
}

export default Wraper;
