import SudokuCell from './SudokuCell';
import Memento from './Memento';

export default class SudokuBoard {
  private _board: SudokuCell[][];
  private _size: number;
  private _boxSize : number;

  constructor(initialValues: (number | null)[][],size : number, boxSize : number) {
    this._size = size
    this._boxSize = boxSize
    this._board = initialValues.map(row => row.map(value => new SudokuCell(value,value !== null)));
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

  setCellValue(row: number, col: number, value: number | null): boolean | null{
    const isValid = this.checkMoveValidity(row,col,value);
    this._board[row][col].value = value;
    return isValid
  }

  getCellValid(row: number, col: number): boolean | null {
    return this._board[row][col].isValid
  }

  setCellValid(row: number, col: number, isValid: boolean | null): void {
    this._board[row][col].isValid = isValid;
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
        this._board[row][col] = new SudokuCell(initialValues[row][col],initialValues[row][col] != null);
      }
    }
  }

  createMemento(): Memento {
    // Create a memento with the current state of the board
    return new Memento(this._board.map(row => row.map(cell => cell.value)));
  }

  restoreFromMemento(memento: Memento): void {
    // Restore the board state from the memento
    this._board = memento.getState().map(row =>
      row.map(value => new SudokuCell(value))
    );
  }

  checkMoveValidity(row: number, col: number, value: number | null): boolean | null {
    if(value === null){
      this.setCellValid(row,col,null)
      return null
    }

    if (this.valueExistsInRow(row, value)) {
      this.setCellValid(row,col,false)
      return false
    }

    if (this.valueExistsInColumn(col, value)) {
      this.setCellValid(row,col,false)
      return false
    }
  
    if (this.valueExistsInBox(row, col, value)) {
      this.setCellValid(row,col,false)
      return false
    }

    this.setCellValid(row,col,true)
    return true
  }
  
  valueExistsInRow(row: number, value: number): boolean {
    for (let col = 0; col < this._size; col++) {
      if (this.getCellValue(row, col) === value) {
        return true;
      }
    }
    return false;
  }
  
  valueExistsInColumn(col: number, value: number): boolean {
    for (let row = 0; row < this._size; row++) {
      if (this.getCellValue(row, col) === value) {
        return true;
      }
    }
    return false;
  }
  
  valueExistsInBox(startRow: number, startCol: number, value: number): boolean {
    const boxSize = this._boxSize;
    const boxStartRow = Math.floor(startRow / boxSize) * boxSize;
    const boxStartCol = Math.floor(startCol / boxSize) * boxSize;
  
    for (let row = boxStartRow; row < boxStartRow + boxSize; row++) {
      for (let col = boxStartCol; col < boxStartCol + boxSize; col++) {
        if (this.getCellValue(row, col) === value) {
          return true;
        }
      }
    }
  
    return false;
  }

  isComplete() {
    for (let row = 0; row < this._board.length; row++) {
      for (let col = 0; col < this._board[row].length; col++) {
        if (!this.getCellValid(row, col)) {
          return false;
        }
      }
    }
    return true
  }
}
