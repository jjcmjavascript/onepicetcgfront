import React from "react";
import Container from "./container";

function ContainerFluidDark({ children }) {
  return (
    <Container className="container-fluid bg-dark min100vh">
      {children}
    </Container>
  );
}

export default ContainerFluidDark;
