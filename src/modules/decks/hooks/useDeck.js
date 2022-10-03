import react, {useState}  from 'react';

export default (rules) => {  
    const [deck, setDeck] = useState([]);   
    
    const setInDeck = (card)=> {
        if(rules.isAllowed(card, deck)){
            setDeck([...deck, card]);
        }   
    }

    const removeFromDeck = (index)=> {
        deck.splice(index, 1);
        setDeck([...deck]);   
    }

    return {deck, setDeck, setInDeck, removeFromDeck};
}