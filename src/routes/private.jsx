import React from "react";
import { Route } from "react-router-dom";

import Deck from "../modules/decks/view/list";
import DeckCreate from "../modules/decks/view/creator";

import DuelMode from "../modules/duels/views/index";

export default () => {
  return (
    <>
      <Route path="/" element={<Deck />} />
      <Route path="decks" element={<Deck />} />
      <Route path="decks/create" element={<DeckCreate />} />
      <Route path="decks/edit/:id" element={<DeckCreate />} />

      <Route path="duels" element={<DuelMode />}>
        <Route path="vsplayer" element={<DuelMode />} />
      </Route>
    </>
  );
};
