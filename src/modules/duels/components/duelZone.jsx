import React, {useContext} from "react";

import Store from "../provider/duelProvider";
import Container from "../../../components/container";


function DuelZone({children}) {
  const {state, hooks} = useContext(Store.DuelContext);

  return (<>

  </>);
}

export default DuelZone;
