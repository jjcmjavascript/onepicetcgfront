import shuffle from './shuffle';
import setUuid from './setUuid';
import formatCardsForDeck from './formatCardsForDeck';
import deckRules from './deckRules';
import cardTypes from './cardTypes';
import { faker } from '@faker-js/faker';
import * as effectRules from './effectRules';

const getUuid = () => faker.datatype.uuid();

export { shuffle, setUuid, formatCardsForDeck, deckRules, cardTypes, getUuid , effectRules};
