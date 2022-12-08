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
                <img src={url} className="img-fluid" />
            </div>
        </span>
    </>
}