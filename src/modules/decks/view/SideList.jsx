import react, {useState, useContext} from "react";
import { CardContext } from '../providers/CardList';
import InputSeach  from '../components/InputSeach';
import BtnOutline from '../../../components/BtnOutline';
import ListContainer from "../components/ListContainer";
import SimpleCard from '../components/SimpleCard';
import FloatingCard from "../components/FloatingCardShower";

function List({ className }) {
    const { usePaginate, useFilters, useDeck} = useContext(CardContext);
    const [filters, setFilters] = useFilters;
    const {cards}  = usePaginate;
    const {setInDeck} = useDeck;
    const [activeCard, setActiveCard] = useState(null);
    
    return <>       
        <div className={className}>
            {activeCard && <FloatingCard className="col-12" url={activeCard._image_full.route}/>}
            <InputSeach/>
            <ListContainer className="col-12 mt-1 text-center px-2 ">
                {
                    cards.length > 0 
                        && cards.map((card, indexKey)=>{
                            return (
                            <SimpleCard key={indexKey} id ={card.id} className="card col-12 mt-1 border-default"
                                onClick={()=> setInDeck(card) } 
                                onMouseEnter={()=> setActiveCard(card) } 
                                onMouseLeave={()=> setActiveCard(null) } 
                            > 
                                🥋{card.name} | 💸{card.cost} 
                            </SimpleCard>)
                        })
                } 
            </ListContainer>

            <BtnOutline className="info mt-2 col-12" onClick={()=> setFilters(item => {
                return {...item, page: item.page + 1 };
            })}> Mostrar mas </BtnOutline>
        </div>
    </>
}

export default List;