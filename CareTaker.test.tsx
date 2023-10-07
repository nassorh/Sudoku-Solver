import CareTaker from './src/sudoku/CareTaker'
import Memento from './src/sudoku/Memento';
import SudokuCell from './src/sudoku/SudokuCell';
//Test Mementos

const memento1 = new Memento([
    [new SudokuCell(2),new SudokuCell(3),new SudokuCell(4)]
]);

const memento2 = new Memento([
  [new SudokuCell(5),new SudokuCell(6),new SudokuCell(3)]
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


