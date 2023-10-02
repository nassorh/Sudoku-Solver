import SudokuCell from './SudokuCell';

export default class SudokuBoard {
  private _board: SudokuCell[][];
  private _size: number;
  private _boxSize : number;

  constructor(initialValues: (number | null)[][],size : number, boxSize : number) {
    this._size = size
    this._boxSize = boxSize
    this._board = initialValues.map(row => row.map(value => new SudokuCell(value)));
  }

  //Getter and setters
  public get size(): number {
    return this._size;
  }

  public get boxSize(): number {
    return this._boxSize;
  }

  //Cell Values
  getCellValue(row: number, col: number): number | null {
    return this._board[row][col].value
  }

  setCellValue(row: number, col: number, value: number | null): void {
    this._board[row][col].value = value;
  }

  //Cell Notes
  getCellNotes(row: number, col: number): Set<number> {
    return this._board[row][col].notes
  }
  
  addCellNotes(row: number, col: number, note: number): void {
    this._board[row][col].addNote(note);
  }

  removeCellNote(row: number, col: number, note: number): void {
    this._board[row][col].removeNote(note);
  }

  clearCellNote(row: number, col: number): void {
    this._board[row][col].clearNotes();
  }

  print(): void {
    console.log('Sudoku Board:');
    for (let row = 0; row < this.size; row++) {
      let rowString = '';
      for (let col = 0; col < this.size; col++) {
        const cellValue = this.getCellValue(row, col);
        rowString += cellValue !== null ? cellValue : '.';
        rowString += ' ';
      }
      console.log(rowString.trim());
    }

    console.log('\nSudoku Board Notes:');
    for (let row = 0; row < this.size; row++) {
      let rowString = '';
      for (let col = 0; col < this.size; col++) {
        const cellNotes = Array.from(this.getCellNotes(row, col)).join(', ');
        rowString += cellNotes ? `[${cellNotes}]` : '. ';
      }
      console.log(rowString.trim());
    }
  }

  reset(initialValues: (number | null)[][]): void {
    for (let row = 0; row < this._size; row++) {
      for (let col = 0; col < this._size; col++) {
        this._board[row][col].value = initialValues[row][col];
        this._board[row][col].clearNotes()
      }
    }
  }
}
