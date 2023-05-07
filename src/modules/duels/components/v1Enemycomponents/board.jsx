import { useContext } from "react";

import CharacterZone from "./characterArea/characterZone";
import DonZone from "./donArea/donZone";
import HandZone from "./handArea/handZone";
import LeaderZone from "./leaderArea/leaderZone";
import LifeCardHalf from "./LifeCardHalf";
import Store from "../../provider/duelProvider";

function Board() {
  const { states } = useContext(Store.DuelContext);
  const { boardTwo } = states;
  const [board] = boardTwo;

  return (
    <>
      <div className={`field`}>
        <div>
          <HandZone />
          <DonZone />
          <LeaderZone />
          <CharacterZone />
        </div>

        <div className="lives">
          {board.lives.map((live) => {
            return <LifeCardHalf card={live} key={live.uuid} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Board;
