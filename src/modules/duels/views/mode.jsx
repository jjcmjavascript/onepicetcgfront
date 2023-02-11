import React from "react";
import { Link } from "react-router-dom";
import ContainerFluidDark from "../../../components/containerFluidDark";
import CardComponent from "../../../components/card";

function DuelMode() {
  const modes = [
    { mode: "vsia", name: "Vs IA" },
    { mode: "vsplayer", name: "Vs Jugador" },
    { mode: "vsfriend", name: "Vs Amigo" },
    { mode: "ramdon", name: "Ver duelo Aletaorio" },
  ];

  return (
    <ContainerFluidDark>
      <div className="col-xs-12 text-light fs-2 vinyl text-center">
        Modos De Juego
      </div>

      {modes.map((option) => {
        return (
          <CardComponent
            className="card mt-1 bg-secondary text-light offset-2 col-8"
            key={option.mode}
          >
            <Link
              to={`/duels/${option.mode}`}
              title="Editar"
              className="text-light text-center"
            >
              <div className="vinyl">{option.name}</div>
            </Link>
          </CardComponent>
        );
      })}

      <div className="mt-2 col-12 text-light fs-2 text-center">
        <div className="offset-3 col-6 form-group">
          <label className="vinyl">Mi Deck</label>
          <select className="form-control">
            <option value="1">Deck One</option>
            <option value="2">Deck Two</option>
          </select>
        </div>
      </div>
    </ContainerFluidDark>
  );
}

export default DuelMode;
