import React from "react";
import Container from "./container";

function ContainerFluidDark({ children , className = '' }) {
  const classes = `container-fluid bg-dark min100vh ${className}`;
  return (
    <Container className={classes}>
      {children}
    </Container>
  );
}

export default ContainerFluidDark;
