import { faker } from '@faker-js/faker';
import CryptoJS from 'crypto-js';
import effectsMapper from '../modules/duels/services/effectsMapper';

class Card {
  constructor(cardObject) {
    this.id = cardObject.id;
    this.cost = cardObject.cost;
    this.name = cardObject.name;
    this.otherName = cardObject.otherName;
    this.power = cardObject.power;
    this.isAlternative = cardObject.isAlternative;
    this.typeId = cardObject.typeId;
    this.packId = cardObject.packId;
    this.code = cardObject.code;
    this.cardNumber = cardObject.cardNumber;
    this.cardText = cardObject.cardText;
    this.imageId = cardObject.imageId;
    this.fullImageId = cardObject.fullImageId;
    this.lives = cardObject.lives;
    this.blocker = cardObject.blocker;
    this.rush = cardObject.rush;
    this.counter = cardObject.counter;
    this.banish = cardObject.banish;
    this.doubleAttack = cardObject.doubleAttack;
    this.donRest = cardObject.donRest;
    this.donRemove = cardObject.donRemove;
    this.donSet = cardObject.donSet;
    this.trigger = cardObject.trigger;
    this.attackType = cardObject.attackType;
    this.euUsable = cardObject.euUsable;
    this.asiaUsable = cardObject.asiaUsable;
    this.colors = cardObject.colors;
    this.type = cardObject.type;
    this.pack = cardObject.pack;
    this.categories = cardObject.categories;
    this._image = cardObject._image;
    this._image_full = cardObject._image_full;

    this.uuid = cardObject.uuid;
    this.powerAdded = cardObject.powerAdded || [];
    this.overCards = cardObject.overCards;
    this.rested = cardObject.rested;
    this.underCardId = cardObject.underCardId;
    this.toSelect = cardObject.toSelect;
    this.selected = cardObject.selected;
  }

  get currentPower() {
    return this.power + this.powerAdded.reduce((a, b) => a + b, 0);
  }

  get codeName() {
    return this.name
      .toString()
      .toLowerCase()
      .replace(/\s/g, '')
      .concat(`:${this.code}`);
  }

  get effects() {
    let effects = effectsMapper(this.codeName);

    if (this.type === 'Character') {
      effects = {
        ...effects,
        ...effectsMapper('characters'),
      };
    }

    return effects;
  }

  static generateFakeCard() {
    const options = ['monsterid', 'robohash', 'wavatar'];
    const choice = faker.helpers.arrayElement(options);
    const emailToMd5 = CryptoJS.MD5(faker.internet.email()).toString();
    const imagen = `https://gravatar.com/avatar/${emailToMd5}?s=400&d=${choice}&r=x`;

    const fakeCard = {
      id: faker.datatype.uuid(),
      uuid: faker.datatype.uuid(),
      cost: faker.datatype.number({ min: 6, max: 6 }),
      name: faker.lorem.words(2),
      otherName: faker.lorem.words(2),
      power: faker.helpers.arrayElement(
        Array(10)
          .fill(0)
          .map((_, i) => (i + 1) * 1000)
      ),
      isAlternative: faker.datatype.boolean(),
      typeId: faker.datatype.uuid(),
      packId: faker.datatype.uuid(),
      code: faker.datatype.string(5),
      cardNumber: faker.datatype.number({ min: 1, max: 9999 }),
      cardText: faker.lorem.sentences(2),
      imageId: faker.datatype.uuid(),
      fullImageId: faker.datatype.uuid(),
      lives: faker.datatype.number({ min: 1, max: 10 }),
      blocker: faker.datatype.boolean(),
      rush: faker.datatype.boolean(),
      counter: faker.datatype.boolean(),
      banish: faker.datatype.boolean(),
      doubleAttack: faker.datatype.boolean(),
      donRest: faker.datatype.boolean(),
      donRemove: faker.datatype.boolean(),
      donSet: faker.datatype.boolean(),
      trigger: faker.datatype.boolean(),
      attackType: faker.helpers.arrayElement(['NORMAL', 'PENETRATE', 'DUAL']),
      euUsable: faker.datatype.boolean(),
      asiaUsable: faker.datatype.boolean(),
      colors: faker.helpers.arrayElements(
        ['RED', 'GREEN', 'BLUE', 'YELLOW'],
        faker.datatype.number({ min: 1, max: 2 })
      ),
      type: faker.helpers.arrayElement([
        'Event',
        'Character',
        'Stage',
        'Leader',
        'Don',
      ]),
      pack: faker.lorem.word(),
      categories: faker.helpers.arrayElements(
        ['Supernova', 'Straw Hat Crew', 'ZOMBIE', 'MACHINE'],
        faker.datatype.number({ min: 1, max: 2 })
      ),
      _image: {
        route: imagen,
      },
      _image_full: {
        route: imagen,
      },
      powerAdded: [],
      overCards: [],
      rested: false,
      underCardId: null,
      toSelect: false,
      selected: false,
    };

    return new Card(fakeCard);
  }
}

export default Card;
