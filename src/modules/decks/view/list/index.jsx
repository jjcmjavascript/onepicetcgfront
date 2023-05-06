import React from "react";
import MainSection from "./main";
import SearchSection from "./search";
import Store from "../../provider/deckProvider";
import Container from "../../../../components/container";

export default function DeckList() {
  const styles = {
    backgroundColor: "rgba(0,0,0,0.1)",
    minHeight: "80vh",
    maxHeight: "100vh",
    borderRadius: "5px",
  };

  return (
    <Store.CardProvider>
      <Container className="container-fluid bg-dark min100vh">
        <div className="offset-1 col-10 mt-4" style={styles}>
          <SearchSection className="col-12 pt-2" />
          <MainSection className="col-12 pt-2" />
        </div>
      </Container>
    </Store.CardProvider>
  );
}
