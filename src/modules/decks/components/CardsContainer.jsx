import react from 'react';

const divStyle = {
    'minHeight': '600px',
    'maxHeight': '600px',
    'overflowY' : 'scroll'
};

export default ({children, className})=>{
    return <>
        <div className={className} style={divStyle}>
            {children}
        </div>
    </>
}; 