const defaultStyle = {
  zIndex: 2,
  width: "300px",
  position: "absolute",
  left: "49vw",
  top: "10vh",
};

export default ({ url, className }) => {
  return (
    <>
      <div className={className} style={defaultStyle}>
        <img src={url} className="img-fluid" />
        text
      </div>
    </>
  );
};
