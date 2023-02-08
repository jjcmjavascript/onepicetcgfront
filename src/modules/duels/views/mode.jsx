import React from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import Container from "../../../components/container";
import CardComponent from "../../../components/card";

function DuelMode() {
  const modes = [
    { mode: "vsia", name: "Vs IA" },
    { mode: "vsplayer", name: "Vs Jugador" },
    { mode: "vsfriend", name: "Vs Amigo" },
    { mode: "ramdon", name: "Ver duelo Aletaorio" },
  ];

  return (
    <Container className="container-fluid bg-dark min100vh">
      <div className="col-xs-12 text-light fs-2 vinyl text-center">
        Modos De Juego
      </div>

      {modes.map((option) => {
        return (
          <CardComponent
            className="card mt-1 bg-secondary text-light offset-2 col-8"
            key={option.mode}
          >
            <Container>
              <Link
                to={`/duels/${option.mode}`}
                title="Editar"
                className="text-light text-center"
              >
                <div className="vinyl">{option.name}</div>
              </Link>
            </Container>
          </CardComponent>
        );
      })}
    </Container>
  );
}

export default DuelMode;
