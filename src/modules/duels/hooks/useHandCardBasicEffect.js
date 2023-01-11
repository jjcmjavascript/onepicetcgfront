import { useState } from 'react';

function useHandCardBasicEffect() {
  const [isReavealing, setRevealing] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [activeCardOptions, setActiveCardOption] = useState(null);

  const reveal = (item) => {
    setRevealing(true);

    item.classList.add('amplify');

    setTimeout(() => {
      setRevealing(false);
      item.classList.remove('amplify');
    }, 1000);
  };

  const play = (card, item) => {};

  const hideOptions = () => {
    // const cardsInHandElementsOptions = document.querySelectorAll(
    //   `.hand--area__card__options`
    // );
    // cardsInHandElementsOptions.forEach((cardHtml) => {
    //   cardHtml.classList.add('hide');
    // });
  };

  const showOptions = (cardHtmlElement) => {
    const optionsElement = document.querySelector('.hand--area__card__options');

    if (activeCardOptions != cardHtmlElement) {
      setActiveCardOption(cardHtmlElement);

      optionsElement.style.width = `${cardHtmlElement.clientWidth}px`;

      optionsElement.style.top = `${cardHtmlElement.y + 20}px`;

      optionsElement.style.left = `${cardHtmlElement.x}px`;

      optionsElement.classList.remove('hide');

      return;
    }

    optionsElement.classList.toggle('hide');
  };

  return {
    isReavealing,
    reveal,
    play,
    showOptions,
  };
}

export default useHandCardBasicEffect;
