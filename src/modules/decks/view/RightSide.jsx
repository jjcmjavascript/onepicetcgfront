import react, {useContext} from "react";
import { CardContext } from '../providers/CardList';
import SimpleCard from '../components/SimpleCard';

function RightSide({ className }) {
    const {useActiveCard} = useContext(CardContext);
    const [activeCard, setActiveCard] = useActiveCard;

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