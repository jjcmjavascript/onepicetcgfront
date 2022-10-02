import react from 'react';
import './FloatingCard.css'; 

export default (children)=>{
    return <>
        <div className='floatContainer'>
            {children}
        </div>
    </>
}