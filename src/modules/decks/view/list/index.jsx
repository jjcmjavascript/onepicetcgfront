import React from "react";
import store from "../../provider/store";
import Container from "../../../../components/container";

import Main from "./main";

export default function DeckList(){
  return (
    <store.CardProvider>
      <Container className="container-fluid">
        <Main className="col-6 pt-2" />
      </Container>
    </store.CardProvider>
  );
};
