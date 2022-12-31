import React, { useState, useContext } from "react";
import Input from "../../../components/input";
import BtnOutline from "../../../components/btnOutline";
import store from "../providers/store";

const inputSearch = (props) => {
  const validRegExp = /^[\w|\s]+$/i;
  const { hooks, states } = useContext(store.cardContext);
  const [selects] = hooks.selects;
  const [_, setFilters] = states.filters;
  const { setCards } = hooks.paginate;

  const [nameValue, setNameValue] = useState("");
  const [colorValue, setColorValue] = useState("");
  const [typeValue, setTypeValue] = useState("");

  const nameChangeHandler = (event) => {
    setNameValue(event.target.value);
  };

  const colorChangeHandler = (event) => {
    setColorValue(event.target.value);
  };

  const typeChangeHandler = (event) => {
    setTypeValue(event.target.value);
  };

  const searchHandler = () => {
    const newFilters = {};

    validRegExp.test(nameValue.trim()) && (newFilters.name = nameValue.trim());
    validRegExp.test(colorValue.trim()) &&
      (newFilters.color = colorValue.trim());
    validRegExp.test(typeValue.trim()) && (newFilters.type = typeValue.trim());

    if (Object.keys(newFilters).length !== 0) {
      setCards([]);
      setFilters({
        page: 1,
        ...newFilters,
      });
    } else {
      setCards([]);
      setFilters({
        page: 1,
      });
    }
  };

  return (
    <>
      <div className="d-flex mt-2">
        <Input
          placeholder="Nombre de la carta"
          value={nameValue}
          onChange={nameChangeHandler}
        />

        <BtnOutline className="success mx-1" onClick={searchHandler}>
          Buscar
        </BtnOutline>
      </div>

      <div className="row mt-2 ">
        <div className="col-6">
          <select
            className="form-select"
            value={colorValue}
            onChange={colorChangeHandler}
          >
            <option value=""> Colores ...</option>

            {selects.colors.map((color) => {
              return (
                <option key={color.id} value={color.id}>
                  {color.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-6">
          <select
            className="form-select"
            value={typeValue}
            onChange={typeChangeHandler}
          >
            <option value=""> Tipos ... </option>
            {selects.types.map((type) => {
              return (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export default inputSearch;
