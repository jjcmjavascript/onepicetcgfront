import { useState } from 'react';

function useHandCardBasicEffect() {
  const [isReavealing, setRevealing] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [isShowingOptions, setShowingOptions] = useState(false);

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
    // hideOptions();

    // cardHtmlElement.children[0].classList.remove('hide');
  };

  return {
    isReavealing,
    reveal,
    play,
    showOptions,
    setShowingOptions,
    isShowingOptions
  };
}

export default useHandCardBasicEffect;
