export default class Memento {
    private _state: (number | null)[][];
  
    constructor(state: (number | null)[][]) {
      this._state = state.map(row => [...row]);
    }
  
    getState(): (number | null)[][] {
      return this._state;
    }
  }
  