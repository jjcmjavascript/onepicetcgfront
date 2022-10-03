const defaultStyle = {
    'zIndex': 2,
    'width': '300px',
    'position' : 'absolute',
    left : '49vw',
    top: "10vh"
};

export default ({ url, className }) => {
    return <>
        <span>
            <div className={className} style={defaultStyle}>
                <img src={'http://localhost:8080/public/' + url} className="img-fluid" />
            </div>
        </span>
    </>
}