import Play from './Play';

class Plays {
  constructor(plays) {
    this.list = plays;
  }

  static getDefault() {
    return new Plays({
      1: [],
    });
  }

  static getInstancefromObject(plays) {
    let playsInstance = new Plays({});
    playsInstance.list = playsInstance.mapObjectToClasses(plays);

    return playsInstance;
  }

  mapObjectToClasses(plays) {
    return Object.entries(plays.list).reduce((acc, [key, value]) => {
      acc[key] = value.map((play) => new Play(play));

      return acc;
    }, {});
  }

  merge({ turnNumber, play }) {
    const currentPlayList = this.list[turnNumber] || [];

    return new Plays({
      ...this.list,
      [turnNumber]: [...currentPlayList, new Play(play)],
    });
  }
}

export default Plays;
