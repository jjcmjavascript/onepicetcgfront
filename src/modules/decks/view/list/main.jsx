import React, { useContext } from "react";
import store from "../../provider/store";
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

  return (
    <Container className="container-fluid" style={style}>
      <div>
        <Link to="/decks/create" className="btn btn-success float_button">
          Crear <BsPlus />
        </Link>
      </div>

      {filteredDeck.map((deck) => {
        return (
          <CardComponent
            className="card mt-1 bg-secondary text-light"
            key={deck.id + deck.name}
          >
            <Container>
              <div className="col-10">{deck.name}</div>
              <div className="col-2">
                <Btn className="danger btn-sm" title="Borrar">
                  <FiDelete />
                </Btn>
                <Btn className="warning btn-sm mx-1" title="Editar">
                  <FiEdit />
                </Btn>
              </div>
            </Container>
          </CardComponent>
        );
      })}
    </Container>
  );
}
