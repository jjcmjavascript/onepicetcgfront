import React from "react";
import store from "../providers/store";
import Container from "../../../components/container";

import LeftSide from "./leftSideList";
import RightSide from "./rightSide";
import Main from "./main";

const deck = () => {
  return (
    <store.cardProvider>
      <Container className="container-fluid">
        <LeftSide className="col-3" />
        <Main className="col-6 pt-2" />
        <RightSide className="col-3" />
      </Container>
    </store.cardProvider>
  );
};

export default deck; hola
