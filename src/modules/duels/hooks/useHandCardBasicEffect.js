import { useState } from 'react';

function useHandCardBasicEffect() {
  const [activeCard, setActiveCard] = useState(null);
  const [activeCardHtml, setActiveCardHtml] = useState(null);

  const reveal = () => {
    hideOptions();

    const activeCard = activeCardHtml.parentNode;

    activeCard.classList.add('amplify');

    setTimeout(() => {
      activeCard.classList.remove('amplify');
      setActiveCard(null);
      setActiveCardHtml(null);
    }, 1000);
  };

  const play = (item) => {};

  const hideOptions = () => {
    const optionsElement = document.querySelector('.hand--area__card__options');
    optionsElement.classList.add('hide');
  };

  const toggleOptions = (cardHtmlElement, card) => {
    const optionsElement = document.querySelector('.hand--area__card__options');

    if (activeCardHtml != cardHtmlElement) {
      setActiveCardHtml(cardHtmlElement);

      optionsElement.style.width = `${cardHtmlElement.clientWidth}px`;

      optionsElement.style.top = `${cardHtmlElement.y + 20}px`;

      optionsElement.style.left = `${cardHtmlElement.x}px`;

      optionsElement.classList.remove('hide');

      setActiveCard(card);

      return;
    }

    optionsElement.classList.toggle('hide');
    setActiveCard(null);
  };

  return {
    reveal,
    play,
    toggleOptions,
    activeCard,
    hideOptions,
    activeCardHtml,
  };
}

export default useHandCardBasicEffect;
