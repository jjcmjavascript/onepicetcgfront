const isFull = (deck)=>{
    return deck.length >= 50;     
}; 

const isMaxCardQuantityAllowed = (card, deck)=>{
    return deck.filter(currentCard => currentCard.codigo === card.codigo).length >= 4; 
}; 

const isAllowed = (card, deck)=>{
    return !isFull(deck) && !isMaxCardQuantityAllowed(card, deck);
}

export default {
    isMaxCardQuantityAllowed,
    isFull,
    isAllowed
}


