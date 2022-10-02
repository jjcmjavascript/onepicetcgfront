import react, {useState, useEffect} from 'react';
import cardService from '../services/card_service'; 

const paginateSchema = {
    total: 0,
    pages: 0,
    currentPage: 0,
    nextPage: null,
    rows : [],
}; 

export function usePaginatedCards({filters}){
    const [paginate, setPaginate] = useState(paginateSchema); 
    const [cards, setCards] = useState([]); 

    useEffect(()=>{
        cardService.findAll(filters)
        .then(res=>{
            setPaginate(res);
            setCards(cards.concat(res.rows));
        })    
    }, [filters]);
        
    return {
        paginate, 
        cards, 
    }
}


