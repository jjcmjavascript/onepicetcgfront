export const donCanBeRested = (don, characters) => {
  return don && !don.rested && characters.length > 0;
}
