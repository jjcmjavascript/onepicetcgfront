import React from "react";
import Store from "../provider/duelProvider";
import Container from "../../../components/container";
import DuelModes from "./mode";
import DuelZone from "../components/duelZone";

const DuelMode = () => {
  return (
    <Store.DuelProvider>
      <Container className="container-fluid bg-dark min100vh">
        <DuelZone />
      </Container>
    </Store.DuelProvider>
  );
};

export default DuelMode;
