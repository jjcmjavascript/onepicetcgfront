import React, { useContext, useState } from "react";
import store from "../../provider/store";
import Card from "../../../../components/card";
import Input from "../../../../components/input";

export default function SearchSection() {
  const { decks } = useContext(store.CardContext).hooks;
  const { filterByName } = decks;

  return (
    <Card className="card mt-4 bg-w bg-secondary">
      <Input
        placeholder="Nombre del deck"
        onChange={(event) => {
          filterByName(event.target.value);
        }}
      />
    </Card>
  );
}
