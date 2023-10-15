import SudokuCell from './SudokuCell';
export default class Memento {
    private _state: SudokuCell[][];
  
    constructor(state: SudokuCell[][]) {
      this._state = state.map(row => row.map(cell => new SudokuCell(cell)));
    }
  
    getState(): SudokuCell[][] {
      return this._state;
    }
}
