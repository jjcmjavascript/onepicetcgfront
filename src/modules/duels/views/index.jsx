import React from "react";
import Store from "../provider/duelProvider";
import Container from "../../../components/container";
import DuelModes from "./mode";

const DuelMode = () => {
  return (
    <Store.DuelProvider>
      <Container className="container-fluid bg-dark min100vh">
        <DuelModes />
      </Container>
    </Store.DuelProvider>
  );
};

export default DuelMode;
