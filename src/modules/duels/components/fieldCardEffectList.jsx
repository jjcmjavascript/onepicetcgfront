function FieldCardEffectList({ card }) {
  const items = [];
  const attack = card.powerAdded.reduce((prev, next) => prev + next, 0);

  if (card.powerAdded.length > 0) {
    const symbol = attack >= 0 ? "+" : attack < 0 ? "-" : "";

    items.push(`${symbol}${attack}`);
  }

  return (
    <>
      <div className="field--card__effectLists">
        {items.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
    </>
  );
}

export default FieldCardEffectList;
