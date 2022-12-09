import React from "react";
import { Route } from "react-router-dom";

import Deck from "../modules/decks/view";
import Profile from "../modules/profile/views";

export default () => {
  return (
    <>
      <Route path="/" element={<Deck />} />
      <Route path="/profile" element={<Profile />} />
    </>
  );
};
