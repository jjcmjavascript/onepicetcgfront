import { useContext } from "react";
import store from "../../provider/deckProvider";
import Card from "../../../../components/card";
import Input from "../../../../components/input";

export default function SearchSection() {
  const { decks } = useContext(store.CardContext).hooks;
  const { filterByName } = decks;

  return (
    <Card className="card mt-4 bg-w bg-secondary">
      <h1 className="text-center text-light vinyl">Decks</h1>
      <Input
        placeholder="Nombre del deck"
        onChange={(event) => {
          filterByName(event.target.value);
        }}
      />
    </Card>
  );
}
