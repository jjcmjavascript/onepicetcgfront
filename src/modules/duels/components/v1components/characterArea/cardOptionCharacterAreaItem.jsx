function CardOptionsCharacterArea({ children, onClick }) {
  return (
    <>
      <div className="hand--options__item" onClick={onClick}>{children}</div>
    </>
  );
}

export default CardOptionsCharacterArea;
