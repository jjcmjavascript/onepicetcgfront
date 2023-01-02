import React, { useContext, useState } from "react";
import store from "../../provider/store";
import Card from "../../../../components/card";
import Input from "../../../../components/input";

export default function SearchSection() {
  const [search, setSearch] = useState("");
  const { decks } = useContext(store.CardContext).hooks;
  const {filterByName} = decks;

  return (
    <Card className="card mt-4 bg-dark">
      <Input placeholder="Nombre del deck" value={search} onChange={
        (event)=>{
          setSearch(event.target.value)
          filterByName(event.target.value)}
      }/>
    </Card>
  );
}
