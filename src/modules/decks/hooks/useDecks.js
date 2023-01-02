import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import deckService from '../services/deckService';
import rules from '../../../helpers/deckRules';
import useCreationDeck from './useCreationDeck';

export default function useDecks() {
  const [decks, setDecks] = useState([]);
  const [filteredDeck, setFilteredDeck] = useState([]);

  useEffect(() => {
    deckService.getDecks().then((res) => {
      setDecks(res.data);
      setFilteredDeck(res.data);
    });
  }, []);

  const deleteDeck = (deckId) => {
    deckService.deleteDeck(deckId).then((res) => {
      setDecks(decks.filter((deck) => deck._id !== deckId));
    });
  };

  const filterByName = (name) => {
    const filteredDecks = decks.filter((deck) => {
      return deck.name.toLowerCase().includes(name.toLowerCase());
    });
    setFilteredDeck(filteredDecks);
  };

  const saveDeck = (deck, resetDeck) => {
    if (!rules.isValidDeck(deck)) {
      return Swal.fire({
        title: 'Invalid Deck',
        html: [
          'Debes tener 50 cartas en el deck',
          'Debes tener 1 DON',
          'Debes tener 1 Leader',
          'Debe Ingresar un nombre al deck',
        ].join('<br />'),
        icon: 'error',
      });
    }

    const cards = deck.cards.map((item) => item.id);
    const name = deck.name;

    deckService
      .saveDeck({
        cards,
        name,
      })
      .then((res) => {
        Swal.fire({
          title: 'Ok',
          html: 'Deck almacenado con exito',
          icon: 'success',
        });
        resetDeck();
      })
      .catch((err) => {
        const error =  err.message;
        Swal.fire({
          title: 'Error',
          html: error,
          icon: 'error',
        });
      });
  };

  return {
    decks,
    filteredDeck,
    deleteDeck,
    filterByName,
    saveDeck,
  };
}
