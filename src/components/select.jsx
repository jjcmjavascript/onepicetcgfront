const select = ({ children, className = "form-select" }) => {
  return <select className={className}>{children}</select>;
};

export default select;
