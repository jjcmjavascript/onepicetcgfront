import React, { useContext } from "react";
import Store from "../provider/duelProvider";
import Mode from "./mode";
import VsPlayer from "./vsPlayer";
import { useLocation } from 'react-router-dom'

const views = {
  "/duels": <Mode />,
  "/duels/vsplayer": <VsPlayer />,
};

const DuelMode = () => {
  const location = useLocation();
  console.log(location.pathname);
  return views[location.pathname];
};

function Wraper() {
  return (
    <Store.DuelProvider>
      <DuelMode />
    </Store.DuelProvider>
  );
}

export default Wraper;
