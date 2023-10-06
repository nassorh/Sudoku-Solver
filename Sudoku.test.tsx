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

const solutionArray : (number | null)[][] = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
]

describe("Sudoku Board Filling The Cells", () => {
  test("Should fill a cell with a value if it's not filled", () => {
    const sudoku = new Sudoku(sudokuArray, size, boxSize);
    sudoku.fillCell(0,2,8)
    expect(sudoku.board.getCellValue(0,2)).toBe(8);
  });

  test("Should not fill the same cell with the same number", () => {
    const sudoku = new Sudoku(sudokuArray, size, boxSize);
    sudoku.fillCell(0,0,5)
    expect(sudoku.fillCell(0,0,5)).toEqual(null);
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

describe("Sudoku Board Validating moves", () => {
    test("Should return false for invalid move", () => {
      const sudoku = new Sudoku(sudokuArray, size, boxSize);
      expect(sudoku.fillCell(0,2,5)).toEqual(false);
    });

    test("Should return true for valid move", () => {
      const sudoku = new Sudoku(sudokuArray, size, boxSize);
      expect(sudoku.fillCell(0,2,4)).toEqual(true);
    });

    test("Should return null after adding a note after adding an valid value", () => {
      const sudoku = new Sudoku(sudokuArray, size, boxSize);
      expect(sudoku.fillCell(0,2,4)).toEqual(true);

      sudoku.addNote(0,2,5)
      expect(sudoku.board.getCellNotes(0,2)).toEqual(new Set([5]));
      expect(sudoku.board.getCellValid(0,2)).toEqual(null);
    });

    test("Should return null after clearing a cell after adding an valid value", () => {
      const sudoku = new Sudoku(sudokuArray, size, boxSize);
      expect(sudoku.fillCell(0,2,4)).toEqual(true);
      expect(sudoku.clearCell(0,2)).toEqual(true);
      expect(sudoku.board.getCellValid(0,2)).toEqual(null);
    });

    test("Should return null after removing a note", () => {
      const sudoku = new Sudoku(sudokuArray, size, boxSize);
      expect(sudoku.addNote(0,2,4)).toEqual(true);
      expect(sudoku.removeNote(0,2,4)).toEqual(true);
      expect(sudoku.board.getCellValid(0,2)).toEqual(null);
    });

    test("Should return null to empty space after reset which held a invalid value", () => {
      const sudoku = new Sudoku(sudokuArray, size, boxSize);
      expect(sudoku.fillCell(0,2,5)).toEqual(false);
      sudoku.resetBoard()
      expect(sudoku.board.getCellValid(0,2)).toEqual(null);
    });
});

describe("Sudoku Board Should Validate if the game is complete", () => {
  test("Should return true if the game is complete", () => {
    const sudoku = new Sudoku(solutionArray, size, boxSize);
    expect(sudoku.isComplete()).toEqual(true);
  });

  test("Should return false due to null value", () => {
    const sudoku = new Sudoku(sudokuArray, size, boxSize);
    expect(sudoku.isComplete()).toEqual(false);
  });

  test("Should return false due to invalid value", () => {
    const sudoku = new Sudoku(sudokuArray, size, boxSize);
    expect(sudoku.fillCell(0,2,5)).toEqual(false);
    expect(sudoku.isComplete()).toEqual(false);
  });
});

describe("Test copy constructor", () => {
  test("Copy constructor should create an identical Sudoku instance", () => {
    const originalSudoku = new Sudoku(sudokuArray);
    const differentSudoku = new Sudoku(solutionArray);

    const copiedSudoku = new Sudoku(originalSudoku);

    //Reset to ensure that both have the same initial value 
    originalSudoku.resetBoard()
    copiedSudoku.resetBoard()
    expect(copiedSudoku.board).toEqual(originalSudoku.board); //Compares values not object address
  });
});

