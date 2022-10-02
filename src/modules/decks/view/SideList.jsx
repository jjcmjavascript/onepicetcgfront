import react from "react";
import { CardContext } from '../providers/CardList';
import InputSeach  from '../components/InputSeach';
import BtnOutline from '../../../components/BtnOutline';
import CardsContainer from "../components/CardsContainer";
import SimpleCard from '../components/SimpleCard';
// import FloatingCard from "../components/floattingButton/FloatingCard";

function List({ className }) {
    const { usePaginate, setFilters} = react.useContext(CardContext);
    const {cards}  = usePaginate;
    const defaultCard = [{ name : 'Cargando ...', cost : ''}]
    
    return <>
        <div className={className}>
            <InputSeach/>
            <CardsContainer className="col-12 mt-1 text-center px-2 ">
                {
                    cards.length > 0 
                        ? cards.map((card, indexKey)=>(<SimpleCard key={indexKey} id ={card.id}> 
                            {/* <FloatingCard>
                                    asdaqsd
                            </FloatingCard> */}
                        🥋{card.name} | 💸{card.cost} </SimpleCard>))
                        : (<SimpleCard> Sin cartas ... </SimpleCard>)
                } 
            </CardsContainer>

            <BtnOutline className="info mt-2 col-12" onClick={()=> setFilters(item => {
                return {...item, page: item.page + 1 };
            })}> Mostrar mas </BtnOutline>
        </div>
    </>
}

export default List;