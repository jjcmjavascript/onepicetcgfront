import React from "react";

export const CardImage = ({ src, alt, className = "card-img-top" }) => {
  return <img className={className} src={src} alt={alt} />;
};

export const CardTitle = ({ children }) => {
  return <h5 className="card-title">{children}</h5>;
};

export const CardBody = ({ title, children }) => {
  return (
    <div className="card-body">
      {title && <CardTitle>{title}</CardTitle>}
      {children}
    </div>
  );
};

export default ({ className, title, children , onClick}) => {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      <CardBody title={title}>{children}</CardBody>
    </div>
  );
};
