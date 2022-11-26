import react, {useState, useContext} from "react";
import { CardContext } from '../providers/CardList';
import InputSeach  from '../components/InputSeach';
import BtnOutline from '../../../components/BtnOutline';
import ListContainer from "../components/ListContainer";
import SimpleCard from '../components/SimpleCard';
import Select from "../../../components/Select";

function LeftSideList({ className }) {
    const { usePaginate, useFilters, useDeck, useActiveCard} = useContext(CardContext);
    const [filters, setFilters] = useFilters;
    const {cards}  = usePaginate;
    const {setInDeck} = useDeck;
    const [activeCard, setActiveCard] = useActiveCard;
    
    return <>       
        <div className={className}>
            {/* {activeCard && <FloatingCard className="col-12" url={activeCard._image_full.route}/>} */}
            <InputSeach/>

            <div className="row mt-2 ">
                <div className="col-6">
                    <select className="form-select">
                        <option selected> Color ... </option>
                        <option value="1">Rojo</option>
                        <option value="2">Azul</option>
                        <option value="3">Verde</option>
                    </select>
                </div>

                <div className="col-6">
                    <select className="form-select">
                        <option selected> Tipo ... </option>
                        <option value="1">Rojo</option>
                        <option value="2">Azul</option>
                        <option value="3">Verde</option>
                    </select>
                </div>
            </div>
           
           
            <ListContainer className="col-12 mt-1 text-center px-2 ">
                {
                    cards.length > 0 
                        && cards.map((card, indexKey)=>{
                            return (
                            <SimpleCard key={indexKey} id ={card.id} className="card col-12 mt-1 border-default"
                                onClick={()=> setInDeck(card) } 
                                onMouseEnter={()=> setActiveCard(card)} 
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

export default LeftSideList;