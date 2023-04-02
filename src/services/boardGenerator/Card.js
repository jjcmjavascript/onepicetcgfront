const faker = require('@faker-js/faker');

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
    this.image = cardObject.image;
    this.fullImage = cardObject.fullImage;
  }
  static generateFakeCard() {
    const fakeCard = {
      id: faker.datatype.uuid(),
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
      attackType: faker.random.arrayElement(['NORMAL', 'PENETRATE', 'DUAL']),
      euUsable: faker.datatype.boolean(),
      asiaUsable: faker.datatype.boolean(),
      colors: faker.random.arrayElements(
        ['RED', 'GREEN', 'BLUE', 'YELLOW'],
        faker.datatype.number({ min: 1, max: 4 })
      ),
      type: faker.random.arrayElement(['MONSTER', 'SPELL', 'ITEM']),
      pack: faker.lorem.word(),
      categories: faker.random.arrayElements(
        ['DRAGON', 'NINJA', 'ZOMBIE', 'MACHINE'],
        faker.datatype.number({ min: 1, max: 4 })
      ),
      image: faker.image.imageUrl(),
      fullImage: faker.image.imageUrl(),
    };

    return new Card(fakeCard);
  }
}

export default Card;
