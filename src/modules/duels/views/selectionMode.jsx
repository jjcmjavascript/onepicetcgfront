import React, { useContext } from "react";

import Store from "../provider/duelProvider";
import ContainerFluidDark from "../../../components/containerFluidDark";
import LinkWithDisabledOption from "../components/linkWithDisabledOption";

const modes = [
  { mode: "vsia", name: "Vs IA" },
  { mode: "vsplayer", name: "Vs Jugador" },
  { mode: "vsfriend", name: "Vs Amigo" },
  { mode: "ramdon", name: "Ver duelo Aletaorio" },
];

function DuelMode() {
  const { states } = useContext(Store.DuelContext);
  const [decks] = states.decks;
  const [selectedDeck, setDeck] = states.selectedDeck;

  const handleSelect = (e) => {
    const id = parseInt(e.target.value);
    const deck = decks.find((deck) => deck.id === id);

    setDeck(deck || null);
  };

  return (
    <ContainerFluidDark>
      <div className="col-xs-12 text-light fs-2 vinyl text-center">
        Modos De Juego
      </div>

      {modes.map((option) => {
        return (
          <LinkWithDisabledOption
            key={option.mode}
            option={option}
            disabled={!selectedDeck}
          />
        );
      })}

      <div className="mt-2 col-12 text-light fs-2 text-center">
        <div className="offset-3 offset-md-4 col-6 col-md-4 form-group">
          <label className="vinyl">Mi Deck</label>
          <select className="form-control" onChange={handleSelect}>
            <option value="">Selecciona un deck</option>
            {decks.map((deck) => {
              return (
                <option key={deck.id} value={deck.id}>
                  {deck.name.toUpperCase()}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </ContainerFluidDark>
  );
}

export default DuelMode;
