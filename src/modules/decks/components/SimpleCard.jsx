export default ({children, id, borderColor, onMouseEnter, onMouseLeave}) => {
    return (
        <div className={"card col-12 mt-1 border-" + borderColor} key={id} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className="card-body bg-outline-warning">
                {children}
            </div>
        </div>
    );
}