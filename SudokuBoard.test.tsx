// SudokuBoard.test.tsx
import SudokuBoard from './src/sudoku/SudokuBoard';

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

describe('SudokuBoard Cell Values', () => {
  test('should get and set cell values on the board', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);

    expect(sudokuBoard.getCellValue(0, 0)).toBe(5);
    expect(sudokuBoard.getCellValue(0, 2)).toBe(null);

    sudokuBoard.setCellValue(0, 2, 4);
    expect(sudokuBoard.getCellValue(0, 2)).toBe(4);
  });

  test('when adding a value, it should remove all notes', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    
    sudokuBoard.addCellNotes(0, 3, 5)
    expect(sudokuBoard.getCellNotes(0, 3)).toEqual(new Set([5]));

    sudokuBoard.setCellValue(0, 3, 3)
    expect(sudokuBoard.getCellNotes(0, 3)).toEqual(new Set());
    expect(sudokuBoard.getCellValue(0, 3)).toBe(3);
  });
});

describe('SudokuBoard Cell Notes', () => {
  test('should add and remove cell notes on the board', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    
    sudokuBoard.addCellNotes(0, 3, 5)
    expect(sudokuBoard.getCellNotes(0, 3)).toEqual(new Set([5]));

    sudokuBoard.removeCellNote(0, 3, 5)
    expect(sudokuBoard.getCellNotes(0, 3)).toEqual(new Set());
  });

  test('when adding a note, it should remove the value', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    
    sudokuBoard.setCellValue(0, 4, 7)
    expect(sudokuBoard.getCellValue(0, 4)).toBe(7);

    sudokuBoard.addCellNotes(0, 4, 6)
    expect(sudokuBoard.getCellValue(0, 4)).toBe(null);
    expect(sudokuBoard.getCellNotes(0, 4)).toEqual(new Set([6]));
  });

  test('removing a note where a value is and checking its effect', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    
     sudokuBoard.removeCellNote(0, 0, 5)
     expect(sudokuBoard.getCellValue(0, 0)).toBe(5);
  });
});

describe('SudokuBoard resetting', () => {
  test('resetting the board', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    
     sudokuBoard.setCellValue(0, 0, null)
     expect(sudokuBoard.getCellValue(0, 0)).toBe(null);

     sudokuBoard.setCellValue(0, 3, 7)
     expect(sudokuBoard.getCellValue(0, 3)).toBe(7);

     sudokuBoard.addCellNotes(0, 0, 1)
     expect(sudokuBoard.getCellNotes(0, 0)).toEqual(new Set([1]));

     sudokuBoard.reset(sudokuArray)
     expect(sudokuBoard.getCellValue(0, 0)).toBe(5);
     expect(sudokuBoard.getCellValue(0, 3)).toBe(null);
     expect(sudokuBoard.getCellNotes(0, 0)).toEqual(new Set());
     
  });
});
