import React from "react";
import { Route } from "react-router-dom";

import Deck from "../modules/decks/view/list";
import DeckCreate from "../modules/decks/view/creator";

export default () => {
  return (
    <>
      <Route path="/" element={<Deck />} />
      <Route path="decks" element={<Deck />} />
      <Route path="decks/create" element={<DeckCreate />} />
    </>
  );
};
