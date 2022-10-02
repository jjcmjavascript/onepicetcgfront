import react from "react";
import { CardContext } from '../providers/CardList';
import InputSeach  from '../components/InputSeach';
import BtnOutline from '../../../components/BtnOutline';
import CardsContainer from "../components/CardsContainer";
import SimpleCard from '../components/SimpleCard';
import FloatingCard from "../components/CardShower";
import { useState } from "react";


function List({ className }) {
    const defaultCards = [{ name : 'Cargando ...', cost : '', _image_full: { route: ''}}];
    const { usePaginate, setFilters} = react.useContext(CardContext);
    const {cards}  = usePaginate;
    const [activeCard, setActiveCard] = useState(null);
    
    return <>       
        <div className={className}>
            {activeCard && <FloatingCard className="col-12" url={activeCard._image_full.route}/>}

            <InputSeach/>
            <CardsContainer className="col-12 mt-1 text-center px-2 ">
                {
                    cards.length > 0 
                        ? cards.map((card, indexKey)=>{
                            return (
                            <SimpleCard key={indexKey} id ={card.id} 
                                onMouseEnter={()=> {setActiveCard(card)}} 
                                onMouseLeave={()=> {setActiveCard(null)}} 
                                > 
                                🥋{card.name} | 💸{card.cost} 
                            </SimpleCard>)
                        }) : (<SimpleCard> Sin cartas ... </SimpleCard>)
                } 
            </CardsContainer>

            <BtnOutline className="info mt-2 col-12" onClick={()=> setFilters(item => {
                return {...item, page: item.page + 1 };
            })}> Mostrar mas </BtnOutline>
        </div>
    </>
}

export default List;