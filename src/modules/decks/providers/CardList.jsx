import { createContext, useState } from 'react'; 

import {usePaginatedCards} from "../hooks/usePaginatedCards";

const CardContext = createContext(); 

const CardProvider = ({children})=>{
    const [filters, setFilters]= useState({
        page : 1
    });

    const usePaginate = usePaginatedCards({filters});
    
    return (
        <CardContext.Provider 
        value={{ usePaginate, filters, setFilters }}>
            {children}
        </CardContext.Provider>
    );
}; 

export { CardProvider, CardContext }; 