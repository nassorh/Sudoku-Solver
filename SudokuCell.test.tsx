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


