import react from "react"

import Input from "../../../components/Input";
import BtnOutline from "../../../components/BtnOutline";

export default ({})=>{
    return <>
    <div className="d-flex mt-2">
        <Input placeholder="Nombre de la carta"></Input>
        <BtnOutline className="success mx-1"> Buscar </BtnOutline>
    </div>
    </>
} 