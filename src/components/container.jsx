const container = ({ children, style, className = "container-fluid" }) => {
  return (
    <div className={className} style={style}>
      <div className="row"> {children} </div>
    </div>
  );
};

export default container;
