import react, { useContext, useEffect } from 'react';
import SimpleCard from '../components/SimpleCard';
import { CardContext } from '../providers/CardList';

export default ({ className }) => {
    const { useDeck } = useContext(CardContext);
    const {deck, setInDeck, removeFromDeck} = useDeck;

    return <>
        <div className={className}>
            <div className='row'>
                {deck.cards.map((card, cardKey) => {
                    return <div className="col-1 p-1" key={cardKey}>
                        <SimpleCard onClick={ ()=> removeFromDeck(cardKey )}> 
                            <img src={"http://localhost:8080/public/" + card._image.route} className="img-fluid" />
                        </SimpleCard> 
                    </div> 
                })}
            </div>

        </div>
    </>
}