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

  merge({ turnNumber, play }) {
    const currentPlayList = this.list[turnNumber] || [];

    return new Plays({
      ...this.plays,
      [turnNumber]: [...currentPlayList, new Play(play)],
    });
  }
}


export default Plays;
