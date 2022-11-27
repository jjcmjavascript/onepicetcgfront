import React, {useContext} from "react";
import store from '../providers/store';
import SimpleCard from '../components/simpleCard';

function RightSide({ className }) {
    const {useActiveCard} = useContext(store.cardContext);
    const [activeCard] = useActiveCard;

    return <>       
        <div className={className}>
            <SimpleCard className="card col-12 mt-1 border-default">
                {activeCard  && <img src ={'http://localhost:8080/public/'+ activeCard._image_full.route} className="img-fluid"></img>}
            </SimpleCard>
            
            <SimpleCard className="card col-12 mt-1 border-default">
                {activeCard && activeCard.name} <br/>
                {activeCard && activeCard.codigo} -  {activeCard && activeCard.cost} - {activeCard && activeCard.power}<br/>
            </SimpleCard>
        </div>
    </>
} 

export default RightSide;