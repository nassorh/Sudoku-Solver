// SudokuBoard.test.tsx
import Sudoku from './src/sudoku/Sudoku'

//Test Board
const size: number = 9;    
const boxSize: number = 3;  
const sudokuArray: (number | null)[][] = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9]
];

describe("Sudoku Board Filling The Cells", () => {
  test("Should fill a cell with a value if it's not filled", () => {
    const sudoku = new Sudoku(sudokuArray, size, boxSize);
    sudoku.fillCell(0,2,8)
    expect(sudoku.board.getCellValue(0,2)).toBe(8);
  });

  test("Should not fill the same cell with the same number", () => {
    const sudoku = new Sudoku(sudokuArray, size, boxSize);
    sudoku.fillCell(0,0,5)
    expect(sudoku.fillCell(0,0,5)).toEqual(false);
  });
});

describe("Sudoku Board Clearing The Cells", () => {
  test("Should clear a cell if it's filled", () => {
    const sudoku = new Sudoku(sudokuArray, size, boxSize);
    expect(sudoku.clearCell(0,0)).toEqual(true);
  });

  test("Should not clear a cell if it's empty", () => {
    const sudoku = new Sudoku(sudokuArray, size, boxSize);
    expect(sudoku.clearCell(0,3)).toEqual(false);
  });
});

describe("Sudoku Board Adding a note", () => {
  test("Should add a note if the value doesn't exist in the cell", () => {
    const sudoku = new Sudoku(sudokuArray, size, boxSize);
    sudoku.addNote(0,2,5)
    expect(sudoku.board.getCellNotes(0,2)).toEqual(new Set([5]));
  });

  test("Should not try to add the same note twice", () => {
    const sudoku = new Sudoku(sudokuArray, size, boxSize);
    sudoku.addNote(0,2,5)
    expect(sudoku.board.getCellNotes(0,2)).toEqual(new Set([5]));
    expect(sudoku.addNote(0,2,5)).toEqual(false);
  });
});

describe("Sudoku Board Removing a note", () => {
  test("Should remove a note if it exists", () => {
    const sudoku = new Sudoku(sudokuArray, size, boxSize);
    sudoku.addNote(0,2,5)
    expect(sudoku.board.getCellNotes(0,2)).toEqual(new Set([5]));
    sudoku.removeNote(0,2,5)
    expect(sudoku.board.getCellNotes(0,2)).toEqual(new Set());
  });

  test("Should not remove a note that doesn't exist", () => {
    const sudoku = new Sudoku(sudokuArray, size, boxSize);
    expect(sudoku.removeNote(0,2,5)).toEqual(false);
  });
});

describe("Sudoku Board Resetting the board and undo/redos a note", () => {
  test("resetBoard should reset the board to initial values", () => {
    const sudoku = new Sudoku(sudokuArray, size, boxSize);
    sudoku.addNote(0,2,5)
    expect(sudoku.board.getCellNotes(0,2)).toEqual(new Set([5]));
    sudoku.fillCell(0,5,8)
    expect(sudoku.board.getCellValue(0,5)).toBe(8);
    sudoku.resetBoard()
    expect(sudoku.board.getCellNotes(0,2)).toEqual(new Set());
    expect(sudoku.board.getCellValue(0,5)).toBe(null);
  });

  test("undo should retrieve the previous state of the board", () => {
    const sudoku = new Sudoku(sudokuArray, size, boxSize);
    sudoku.fillCell(0,5,8)
    expect(sudoku.board.getCellValue(0,5)).toBe(8);

    sudoku.addNote(0,2,5)
    expect(sudoku.board.getCellNotes(0,2)).toEqual(new Set([5]));

    sudoku.undo()
    expect(sudoku.board.getCellNotes(0,2)).toEqual(new Set());

    sudoku.undo()
    expect(sudoku.board.getCellValue(0,5)).toBe(null);
  });

  test("undo should handle when there are no more undo", () => {
    const sudoku = new Sudoku(sudokuArray, size, boxSize);
    sudoku.fillCell(0,5,8)
    expect(sudoku.board.getCellValue(0,5)).toBe(8);

    sudoku.undo()
    expect(sudoku.board.getCellValue(0,5)).toBe(null);
    expect(sudoku.undo()).toBe(false);
  });

  test("redo should retrieve the next state of the board", () => {
    const sudoku = new Sudoku(sudokuArray, size, boxSize);
    sudoku.fillCell(0,5,8)
    expect(sudoku.board.getCellValue(0,5)).toBe(8);

    sudoku.undo()
    expect(sudoku.board.getCellValue(0,5)).toBe(null);

    sudoku.redo()
    expect(sudoku.board.getCellValue(0,5)).toBe(8);
  });

  test("redo should not retrieve the next state of the board if there is none left", () => {
    const sudoku = new Sudoku(sudokuArray, size, boxSize);
    sudoku.fillCell(0,5,8)
    expect(sudoku.board.getCellValue(0,5)).toBe(8);

    sudoku.undo()
    expect(sudoku.board.getCellValue(0,5)).toBe(null);

    sudoku.redo()
    expect(sudoku.board.getCellValue(0,5)).toBe(8);
    expect(sudoku.redo()).toBe(false);
  });
});
