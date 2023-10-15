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


describe("Test add value", () => {
  test("Should successfully add a value on init", () => {
    const originalSudokuCell = new SudokuCell(5);
    expect(originalSudokuCell.value).toEqual(5);
  });

  test("Should successfully add a value", () => {
    const originalSudokuCell = new SudokuCell(null);
    originalSudokuCell.value = 5
    expect(originalSudokuCell.value).toEqual(5);
  });

  test("Should not add a value with a number greater than 9 on init", () => {
    const originalSudokuCell = new SudokuCell(10);
    expect(originalSudokuCell.value).toEqual(null);
  });

  test("Should not add a value with a number greater than 9", () => {
    const originalSudokuCell = new SudokuCell(null);
    originalSudokuCell.value = 10
    expect(originalSudokuCell.value).toEqual(null);
  });

  test("Should not add a value with a number smaller than 1 on init", () => {
    const originalSudokuCell = new SudokuCell(-1);
    expect(originalSudokuCell.value).toEqual(null);
  });

  test("Should not add a value with a number smaller than 1", () => {
    const originalSudokuCell = new SudokuCell(null);
    originalSudokuCell.value = -1
    expect(originalSudokuCell.value).toEqual(null);
  });

  test("Should not add a value to a fixed value", () => {
    const originalSudokuCell = new SudokuCell(6,true);
    originalSudokuCell.value = 7
    expect(originalSudokuCell.value).toEqual(6);
  });
});

describe("Test remove note", () => {
  test("Should successfully remove", () => {
    const originalSudokuCell = new SudokuCell(null);
    originalSudokuCell.addNote(5)
    originalSudokuCell.removeNote(5)
    expect(originalSudokuCell.notes).toEqual(new Set());
  });

  test("Should handle being passed a note that does not exist", () => {
    const originalSudokuCell = new SudokuCell(null);
    originalSudokuCell.addNote(5)
    originalSudokuCell.removeNote(7)
    expect(originalSudokuCell.notes).toEqual(new Set([5]));
  });
});

describe("Test clear note", () => {
  test("Should successfully remove a note", () => {
    const originalSudokuCell = new SudokuCell(null);
    originalSudokuCell.addNote(5)
    originalSudokuCell.clearNotes()
    expect(originalSudokuCell.notes).toEqual(new Set());
  });

  test("Should successfully remove all notes", () => {
    const originalSudokuCell = new SudokuCell(null);
    originalSudokuCell.addNote(5)
    originalSudokuCell.addNote(6)
    originalSudokuCell.addNote(7)
    expect(originalSudokuCell.notes).toEqual(new Set([5,6,7]));

    originalSudokuCell.clearNotes()
    expect(originalSudokuCell.notes).toEqual(new Set());
  });
});
