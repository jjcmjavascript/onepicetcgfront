import React from "react";

import Input from "../../../components/input";
import BtnOutline from "../../../components/btnOutline";

const inputSearch = () => {
  return (
    <div className="d-flex mt-2">
      <Input placeholder="Nombre de la carta" />
      <BtnOutline className="success mx-1"> Buscar </BtnOutline>
    </div>
  );
};

export default inputSearch;
