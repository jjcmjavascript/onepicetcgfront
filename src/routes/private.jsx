import react from "react";
import { Route } from "react-router-dom";

import Deck from '../modules/decks/view/Index';

export default () => {
    return <>
      <Route path="/" element={<Deck />} />
    </>
  }