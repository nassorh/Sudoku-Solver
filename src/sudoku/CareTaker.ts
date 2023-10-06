import Memento from './Memento';

export default class CareTaker {
  private _mementos: Memento[] = []; //Top of the stack is the current state
  private _currentIndex: number = -1;

  constructor(careTaker?: CareTaker) {
    if (careTaker) {
      // Copy constructor logic
      this._mementos = careTaker._mementos.map(memento => new Memento(memento.getState()));
      this._currentIndex = careTaker._currentIndex;
    }
  }

  addMemento(memento: Memento): void {
    // Add a memento to the stack
    this._mementos.push(memento);
    this._currentIndex = this._mementos.length - 1;
  }

  undo(): Memento | undefined {
    if (this._currentIndex > 0) {
        this._currentIndex--;
        return this._mementos[this._currentIndex];
    }
    return undefined; // No more states to undo
  }

  redo(): Memento | undefined {
    if (this._currentIndex + 1 < this._mementos.length) {
        this._currentIndex++;
        return this._mementos[this._currentIndex];
    }
    return undefined; // No more states to undo
  }
}
