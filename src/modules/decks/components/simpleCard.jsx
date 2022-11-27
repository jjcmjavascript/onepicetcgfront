import React from 'react'; 

const style = {
  cursor: "pointer",
};

/*  eslint-disable */
const simpleCard = ({
  children,
  id,
  onMouseEnter,
  onMouseLeave,
  onClick,
  className,
}) => {
  return (
    <div
      className={className}
      key={id}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="card-body">{children}</div>
    </div>
  );
};
/*  eslint-enable */

export default simpleCard;
