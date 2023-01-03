import React, { useContext } from "react";
import store from "../../provider/deckProvider";
import Container from "../../../../components/container";
import CardComponent from "../../../../components/card";
import Btn from "../../../../components/btn";
import { FiEdit, FiDelete } from "react-icons/fi";
import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function MainDeckListSection() {
  const { decks } = useContext(store.CardContext).hooks;
  const { filteredDeck } = decks;
  const style = {
    overflowY: "scroll",
    maxHeight: "80vh",
    minHeight: "70vh",
  };

  decks.getDecks();

  const deleteDeck = (id) => {
    decks.deleteDeck(id);
  };

  return (
    <Container className="container-fluid" style={style}>
      <Link to="/decks/create" className="btn btn-success mt-1 vinyl fs-2">
        Crear <BsPlus />
      </Link>

      {filteredDeck.map((deck) => {
        return (
          <CardComponent
            className="card mt-1 bg-secondary text-light"
            key={deck.id + deck.name}
          >
            <Container>
              <div className="col-10">{deck.name}</div>
              <div className="col-2">
                <Btn
                  className="danger btn-sm"
                  title="Borrar"
                  onClick={(event) => deleteDeck(deck.id)}
                >
                  <FiDelete />
                </Btn>
                <Link
                  to={`/decks/edit/${deck.id}`}
                  className="btn btn-warning btn-sm mx-1"
                  title="Editar"
                >
                  <FiEdit />
                </Link>
              </div>
            </Container>
          </CardComponent>
        );
      })}
    </Container>
  );
}
