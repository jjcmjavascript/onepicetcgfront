import store from "../../provider/deckProvider";
import Container from "../../../../components/container";

import LeftSide from "./leftSideList";
import RightSide from "./rightSide";
import Main from "./main";

const Creator = () => {
  return (
    <store.CardProvider>
      <Container className="container-fluid">
        <LeftSide className="col-3" />
        <Main className="col-6 pt-2" />
        <RightSide className="col-3" />
      </Container>
    </store.CardProvider>
  );
};

export default Creator;
