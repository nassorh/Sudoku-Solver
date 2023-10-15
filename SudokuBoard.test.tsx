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

  test('when adding a value to a fixed value, it should not update', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    sudokuBoard.setCellValue(0, 0, 6)
    expect(sudokuBoard.getCellValue(0,0)).toEqual(5);
  });

  test("when adding a value, should handle out of bounds", () => {
    const sudoku = new SudokuBoard(sudokuArray, size, boxSize);
    expect(sudoku.setCellValue(-1,-1,5)).toEqual(null);
  });

  test("when getting a value, should handle out-of-bounds", () => {
    const sudoku = new SudokuBoard(sudokuArray, size, boxSize);
    expect(sudoku.getCellValue(-1,-1)).toEqual(null);
  });

  test("Should successfully set a value back to null and make isValid null as well", () => {
    const sudoku = new SudokuBoard(sudokuArray, size, boxSize);
    sudoku.setCellValue(0,2,4)
    expect(sudoku.getCellValue(0,2)).toEqual(4);
    expect(sudoku.getCellValid(0,2)).toEqual(true);

    sudoku.setCellValue(0,2,null)
    expect(sudoku.getCellValue(0,2)).toEqual(null);
    expect(sudoku.getCellValid(0,2)).toEqual(null);
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
    
    sudokuBoard.setCellValue(0, 3, 7)
    expect(sudokuBoard.getCellValue(0, 3)).toBe(7);

    sudokuBoard.addCellNotes(0, 3, 6)
    expect(sudokuBoard.getCellValue(0, 3)).toBe(null);
    expect(sudokuBoard.getCellNotes(0, 3)).toEqual(new Set([6]));
  });

  test('removing a note where a value is and checking its effect', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    
     sudokuBoard.removeCellNote(0, 0, 5)
     expect(sudokuBoard.getCellValue(0, 0)).toBe(5);
  });

  test('when clearing cell notes of a cell with notes, should remove all', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    sudokuBoard.addCellNotes(0,2,1)
    sudokuBoard.addCellNotes(0,2,2)
    sudokuBoard.addCellNotes(0,2,3)
    expect(sudokuBoard.getCellNotes(0, 2)).toEqual(new Set([1,2,3]));

    sudokuBoard.clearCellNote(0,2)
    expect(sudokuBoard.getCellNotes(0, 2)).toEqual(new Set())
  });

  test('when clearing cell notes of a cell with no notes, should handle gracefully', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    expect(sudokuBoard.getCellNotes(0, 2)).toEqual(new Set());
    expect(sudokuBoard.clearCellNote(0, 2)).toEqual(undefined)
  });

  test('when adding a note to a fixed value, it should not update', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    sudokuBoard.addCellNotes(0, 0, 6)
    expect(sudokuBoard.getCellNotes(0,0)).toEqual(new Set());
  });

  test('should handle getting cells notes of an out-of-bound cell', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    expect(sudokuBoard.getCellNotes(-1,-1)).toEqual(new Set());
  });

  test('should handle setting cells notes of an out-of-bound cell', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    expect(sudokuBoard.addCellNotes(-1,-1,5)).toEqual(undefined);
  });

  test('removing a note from an out-of-bound cell', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
     expect(sudokuBoard.removeCellNote(-1, -1, 5)).toBe(undefined);
  });

  test('when clearing cell notes of a cell out of bounds, should handle gracefully', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    expect(sudokuBoard.clearCellNote(-1, -1)).toBe(undefined)
  });
});

describe('SudokuBoard resetting', () => {
  test('resetting the board', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
     sudokuBoard.setCellValue(0, 3, 7)
     expect(sudokuBoard.getCellValue(0, 3)).toBe(7);

     sudokuBoard.addCellNotes(0, 2, 1)
     expect(sudokuBoard.getCellNotes(0, 2)).toEqual(new Set([1]));

     sudokuBoard.reset(sudokuArray)
     expect(sudokuBoard.getCellValue(0, 3)).toBe(null);
     expect(sudokuBoard.getCellNotes(0, 2)).toEqual(new Set());
  });
});

describe('SudokuBoard Get Valid Cells', () => {
  test('should return true on getting a fixed cell', () => {
     const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
     expect(sudokuBoard.getCellValid(0,0)).toBe(true);
  });

  test('should return true on getting a valid cell', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    sudokuBoard.setCellValue(0,2,4)
    expect(sudokuBoard.getCellValid(0,2)).toBe(true);
  });

  test('should return false on getting an invalid cell', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    sudokuBoard.setCellValue(0,2,5)
    expect(sudokuBoard.getCellValid(0,2)).toBe(false);
  });

  test('should handle getting an out-of-bounds cell', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    expect(sudokuBoard.getCellValid(-1,-1)).toBe(null);
  });
});

describe('SudokuBoard Set Valid Cells', () => {
  test('should not update a fixed cell', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    expect(sudokuBoard.getCellValid(0,0)).toBe(true);
    sudokuBoard.setCellValid(0,0,false)
    expect(sudokuBoard.getCellValid(0,0)).toBe(true);
 });

  test('should not update a null cell', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    expect(sudokuBoard.getCellValid(0,2)).toBe(null);
    sudokuBoard.setCellValid(0,2,true)
    expect(sudokuBoard.getCellValid(0,2)).toBe(null);
  });

  test('should update a cell', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);

    sudokuBoard.setCellValue(0,2,4)
    expect(sudokuBoard.getCellValid(0,2)).toBe(true);

    sudokuBoard.setCellValid(0,2,false)
    expect(sudokuBoard.getCellValid(0,2)).toBe(false);
  });

  test('should handle out-of-bound test', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    expect(sudokuBoard.setCellValid(-1,-1,false)).toBe(undefined);
  });
});

describe('SudokuBoard Fixed Cells', () => {
  test('should return true on a fixed cell', () => {
     const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
     expect(sudokuBoard.getCellFixed(0,0)).toBe(true);
  });

  test('should return false on null cells that are initialised', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    expect(sudokuBoard.getCellFixed(0,2)).toBe(false);
  });

  test('should return false on cells that are not fixed', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    sudokuBoard.setCellValue(0,2,5)
    expect(sudokuBoard.getCellFixed(0,2)).toBe(false);
  });

  test('should handle an out-of-bounds cell', () => {
    const sudokuBoard = new SudokuBoard(sudokuArray, size, boxSize);
    expect(sudokuBoard.getCellFixed(-1,-1)).toBe(null);
  });
});

describe("Test copy constructor", () => {
  test("Copy constructor should create an identical Sudoku Board instance", () => {
    const originalSudokuBoard = new SudokuBoard(sudokuArray);

    const copiedSudokuBoard = new SudokuBoard(originalSudokuBoard);

    //Reset to ensure that both have the same initial value 
    expect(copiedSudokuBoard.board).toEqual(copiedSudokuBoard.board); //Compares values not object address
    expect(copiedSudokuBoard.size).toEqual(copiedSudokuBoard.size);
    expect(copiedSudokuBoard.boxSize).toEqual(copiedSudokuBoard.boxSize);
  });
});
