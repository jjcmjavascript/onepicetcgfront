export default ({children, id, onMouseEnter, onMouseLeave, onClick, className}) => {
    const style = {
        cursor : 'pointer',
    }; 

    return (
        <div className={className} key={id} 
            style={style}
            onMouseEnter={onMouseEnter} 
            onMouseLeave={onMouseLeave}
            onClick={onClick}>
            
            <div className="card-body">
                {children}
            </div>
        </div>
    );
}