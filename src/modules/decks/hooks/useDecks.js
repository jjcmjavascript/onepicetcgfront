import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import deckService from '../services/deckService';
import rules from '../../../helpers/deckRules';
import formatCardsForDeck from '../../../helpers/formatCardsForDeck';

const swalMessage = (title, html, icon) => {
  Swal.fire({
    title,
    html,
    icon,
  });
};

export default function useDecks() {
  const [decks, setDecks] = useState([]);
  const [filteredDeck, setFilteredDeck] = useState([]);

  const getDecks = () => {
    useEffect(() => {
      deckService
        .getDecks()
        .then((decks) => {
          decks = formatCardsForDeck(decks);
          setDecks(decks);
          setFilteredDeck(decks);
        })
        .catch((err) => {
          swalMessage('Error', err.message, 'error');
        });
    }, []);
  };

  const getDeckById = (deckId, setDeckFromBackend) => {
    useEffect(() => {
      (async () => {
        try {
          const deck = await deckService.findDeck(deckId);
          const formatedDeck = formatCardsForDeck(deck);

          setDeckFromBackend(formatedDeck);
        } catch (err) {
          swalMessage('Error', err.message, 'error');
        }
      })();
    }, [deckId]);
  };

  const filterByName = (name) => {
    const filteredDecks = decks.filter((deck) => {
      return deck.name.toLowerCase().includes(name.toLowerCase());
    });
    setFilteredDeck(filteredDecks);
  };

  const saveDeck = async (deck, resetDeck) => {
    if (!rules.isValidDeck(deck)) {
      return swalMessage(
        'Invalid Deck',
        [
          'Debes tener 50 cartas en el deck',
          'Debes tener 1 DON',
          'Debes tener 1 Leader',
          'Debe Ingresar un nombre al deck',
        ].join('<br />'),
        'error'
      );
    }

    try {
      const cards = deck.cards.map((item) => item.id);
      const name = deck.name;
      const id = deck.id;

      const deck = id
        ? await deckService.updateDeck({ cards, name, id })
        : await deckService.saveDeck({ cards, name });

      deck = formatCardsForDeck(deck);

      swalMessage('Perfecto!', 'Deck almacenado con exito!', 'success');

      resetDeck();
    } catch (err) {
      swalMessage('Error', err.message, 'error');
    }
  };

  const deleteDeck = async (deckId) => {
    try {
      const swallResponse = await Swal.fire({
        title: 'Estas Seguro?',
        text: 'No podras revertir esta accion!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, borralo!',
      });

      if (swallResponse.isConfirmed) {
        await deckService.deleteDeck(deckId);

        const filteredDecks = decks.filter((deck) => deck.id !== deckId);

        setDecks(filteredDecks);

        setFilteredDeck(filteredDecks);
      }
    } catch (err) {
      console.log(err);
      swalMessage('Error', err.message, 'error');
    }
  };

  return {
    decks,
    filteredDeck,
    deleteDeck,
    filterByName,
    saveDeck,
    getDecks,
    getDeckById,
  };
}
