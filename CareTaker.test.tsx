import CareTaker from './src/sudoku/CareTaker'
import Memento from './src/sudoku/Memento';

//Test Mementos
const memento1 = new Memento([
    [2,3,4]
]);
const memento2 = new Memento([
    [5,6,4]
]);

describe("Test copy constructor", () => {
  test("Copy constructor should create an identical CareTaker instance", () => {
    const originalCareTaker = new CareTaker();
    originalCareTaker.addMemento(memento1);
    originalCareTaker.addMemento(memento2);

    const copiedCareTaker = new CareTaker(originalCareTaker);
    expect(originalCareTaker).toEqual(copiedCareTaker);
  });
});


