export default ({children, id, borderColor}) => {
    return (
        <div className={"card col-12 mt-1 border-" + borderColor} key={id}>
            <div className="card-body bg-outline-warning">
                {children}
            </div>
        </div>
    );
}