const btn = ({ children, className, onClick, disabled, title }) => {
  const defaultClass = "btn btn-success";
  const newClassName = `btn btn-${className}`;

  return (
    <button className={newClassName || defaultClass } type="button" onClick={onClick} disabled={disabled} title={title}>
      {children}
    </button>
  );
};

export default btn;
