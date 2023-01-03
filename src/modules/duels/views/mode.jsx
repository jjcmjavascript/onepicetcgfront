import React from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import Container from "../../../components/container";
import CardComponent from "../../../components/card";

function DuelMode({ className, style, children }) {
  const modes = ["Vs IA", "Vs Jugador", "Vs Amigo", "Ver duelo Aletaorio"];

  return (
    <Container className="container-fluid" style={style}>
      <div className="col-xs-12 text-light fs-2 vinyl text-center">
        Modos De Juego
      </div>

      {modes.map((mode) => {
        return (
          <CardComponent
            className="card mt-1 bg-secondary text-light offset-2 col-8"
            key={mode}
          >
            <Container>
              <Link
                to={`/decks/edit/${mode}`}
                title="Editar"
                className="text-light text-center"
              >
                <div className="vinyl">{mode}</div>
              </Link>
            </Container>
          </CardComponent>
        );
      })}
    </Container>
  );
}

export default DuelMode;
