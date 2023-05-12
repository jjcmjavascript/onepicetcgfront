const MessageAlert = ({ message , className="phaseAlert phaseAlert--yourTurn", style}) => {
  return <div className={className} style={style}>{message}</div>;
};

export default MessageAlert;
