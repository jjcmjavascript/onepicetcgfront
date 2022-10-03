import react from 'react';

const defaultDivStyle = {
    'minHeight': '80vh',
    'maxHeight': '80vh',
    'overflowY' : 'scroll'
};

export default ({children, className, divStyle})=>{
    divStyle = divStyle || defaultDivStyle; 

    return <>
        <div className={className} style={divStyle}>
            {children}
        </div>
    </>
}; 