import React from "react";

const MessageAlert = ({ message , className="phaseAlert phaseAlert--yourTurn" }) => {
  return <div className={className}>{message}</div>;
};

export default MessageAlert;
