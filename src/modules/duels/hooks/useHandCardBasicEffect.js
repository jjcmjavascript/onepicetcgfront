import { useState } from 'react';

function useHandCardBasicEffect() {
  const [isReavealing, setRevealing] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [activeHtmlElement, setActiveCardOption] = useState(null);

  const reveal = (item) => {
    setRevealing(true);
    const activeCard = activeHtmlElement.parentNode;

    activeCard.classList.add('amplify');

    setTimeout(() => {
      setRevealing(false);
      activeCard.classList.remove('amplify');
    }, 1000);
  };

  const play = (item) => {
    const activeCard = activeHtmlElement.parentNode;
  };

  const hideOptions = () => {
    const optionsElement = document.querySelector('.hand--area__card__options');
    optionsElement.classList.add('hide');
  };

  const toggleOptions = (cardHtmlElement, card) => {
    const optionsElement = document.querySelector('.hand--area__card__options');

    if (activeHtmlElement != cardHtmlElement) {
      setActiveCardOption(cardHtmlElement);

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
    isReavealing,
    reveal,
    play,
    toggleOptions,
    activeCard,
    hideOptions,
  };
}

export default useHandCardBasicEffect;
