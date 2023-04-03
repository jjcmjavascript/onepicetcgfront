import { faker } from '@faker-js/faker';
import CryptoJS from 'crypto-js';

class Card {
  constructor(cardObject) {
    this.id = cardObject.id;
    this.uuid = cardObject.uuid;
    this.cost = cardObject.cost;
    this.name = cardObject.name;
    this.otherName = cardObject.otherName;
    this.power = cardObject.power;
    this.powerAdded = cardObject.powerAdded || [];
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
    this.overCards = cardObject.overCards;
    this.rested = cardObject.rested;
    this.underCardId = cardObject.underCardId;
  }

  get currentPower() {
    return this.power + this.powerAdded.reduce((a, b) => a + b, 0);
  }

  static generateFakeCard() {
    const options = ['monsterid', 'robohash', 'wavatar'];
    const choice = faker.helpers.arrayElement(options);
    const emailToMd5 = CryptoJS.MD5(faker.internet.email()).toString();
    const imagen = `https://gravatar.com/avatar/${emailToMd5}?s=400&d=${choice}&r=x`;

    const fakeCard = {
      id: faker.datatype.uuid(),
      uuid: faker.datatype.uuid(),
      cost: faker.datatype.number({ min: 0, max: 10 }),
      name: faker.lorem.words(2),
      otherName: faker.lorem.words(2),
      power: faker.datatype.number({ min: 0, max: 10000 }),
      isAlternative: faker.datatype.boolean(),
      typeId: faker.datatype.uuid(),
      packId: faker.datatype.uuid(),
      code: faker.datatype.string(5),
      cardNumber: faker.datatype.number({ min: 1, max: 100 }),
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
        faker.datatype.number({ min: 1, max: 4 })
      ),
      type: faker.helpers.arrayElement(['MONSTER', 'SPELL', 'ITEM']),
      pack: faker.lorem.word(),
      categories: faker.helpers.arrayElements(
        ['DRAGON', 'NINJA', 'ZOMBIE', 'MACHINE'],
        faker.datatype.number({ min: 1, max: 4 })
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
    };

    return new Card(fakeCard);
  }
}

export default Card;
