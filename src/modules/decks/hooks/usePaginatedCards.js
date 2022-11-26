import react, {useState, useEffect} from 'react';
import getAllCards from '../services/getAllCards'; 

const paginateSchema = {
    total: 0,
    pages: 0,
    currentPage: 0,
    nextPage: null,
    rows : [],
}; 

export function usePaginateCard({filters}){
    const [paginate, setPaginate] = useState(paginateSchema); 
    const [cards, setCards] = useState([]); 

    useEffect(()=>{
        getAllCards(filters)
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


