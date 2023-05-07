import { useContext } from "react";
import store from "../../provider/deckProvider";
import SimpleCard from "../../components/simpleCard";
import Btn from "../../../../components/btn";
import Input from "../../../../components/input";

export default function RightSide({ className }) {
  const { hooks, states } = useContext(store.CardContext);
  const [activeCard] = states.activeCard;
  const { deck, setName, setDeckFromBackend } = hooks.deck;
  const { decks } = hooks;

  return (
    <>
      <div className={className}>
        <Btn
          className="success col-12 mt-1"
          disabled={false}
          onClick={() => {
            decks.saveDeck(deck, setDeckFromBackend);
          }}
        >
          Guardar
        </Btn>

        <Input
          className="form-control col-12 mt-1"
          placeholder="Nombre del mazo"
          value={deck.name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <SimpleCard className="card col-12 mt-1 border-default">
          {activeCard && (
            <img src={activeCard._image_full.route} className="img-fluid"></img>
          )}
        </SimpleCard>

        <SimpleCard className="card col-12 mt-1 border-default">
          {activeCard && activeCard.name} <br />
          {activeCard && activeCard.card_text}
          <br />
        </SimpleCard>
      </div>
    </>
  );
}
