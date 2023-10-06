import SudokuCell from './src/sudoku/SudokuCell'

describe("Test copy constructor", () => {
  test("Copy constructor should create an identical Sudoku Cell instance", () => {
    const originalSudokuCell = new SudokuCell(4);
    const duplicateSudokuCell = new SudokuCell(originalSudokuCell);

    //Compares values not object address
    expect(originalSudokuCell.value).toEqual(duplicateSudokuCell.value);
    expect(originalSudokuCell.notes).toEqual(duplicateSudokuCell.notes);
    expect(originalSudokuCell.isValid).toEqual(duplicateSudokuCell.isValid);
    expect(originalSudokuCell.fixedValue).toEqual(duplicateSudokuCell.fixedValue); 
  });
});

describe("Test add notes", () => {
  test("Should successfully add a note", () => {
    const originalSudokuCell = new SudokuCell(null);
    expect(originalSudokuCell.value).toEqual(null);

    originalSudokuCell.addNote(5)
    expect(originalSudokuCell.notes).toEqual(new Set([5]));
  });

  test("Should not add a note with a number greater than 9", () => {
    const originalSudokuCell = new SudokuCell(null);
    expect(originalSudokuCell.value).toEqual(null);

    originalSudokuCell.addNote(10)
    expect(originalSudokuCell.notes).toEqual(new Set());
  });

  test("Should not add a note with a number smaller than 1", () => {
    const originalSudokuCell = new SudokuCell(null);
    expect(originalSudokuCell.value).toEqual(null);

    originalSudokuCell.addNote(-1)
    expect(originalSudokuCell.notes).toEqual(new Set());
  });

  test("Should not add a note to a fixed value", () => {
    const originalSudokuCell = new SudokuCell(6,true);
    expect(originalSudokuCell.fixedValue).toEqual(true);

    originalSudokuCell.addNote(7)
    expect(originalSudokuCell.notes).toEqual(new Set());
  });
});


