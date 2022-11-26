import { createContext, useState} from 'react'; 
import { usePaginateCard } from "../hooks/usePaginatedCards";
import useDeckHook from "../hooks/useDeck";
import rules from '../services/deckRules';

const CardContext = createContext(); 

const CardProvider = ({children})=>{
    const useFilters = useState({page : 1});
    const useDeck = useDeckHook(rules);
    const usePaginate = usePaginateCard({filters : useFilters[0]});
    const useActiveCard = useState(null);
    
    return (
        <CardContext.Provider value={{ usePaginate, useFilters, useDeck, useActiveCard}}>
            {children}
        </CardContext.Provider>
    );
}; 

export { CardProvider, CardContext }; 