import SudokuCell from './SudokuCell';
import Memento from './Memento';

export default class SudokuBoard {
  private _board: SudokuCell[][];
  private _size: number;
  private _boxSize : number;

  constructor(input : (number | null)[][] | SudokuBoard, size : number = 9, boxSize : number = 3) {
    if (input instanceof SudokuBoard) {
      this._size = input.size
      this._boxSize = input.boxSize
      this._board = input._board.map(row =>
        row.map(cell => new SudokuCell (cell))
      );
    }else{
      this._size = size
      this._boxSize = boxSize
      this._board = input.map(row => row.map(value => new SudokuCell(value,value !== null)));
    }
  }
  
  //Getter and setters
  public get board(): SudokuCell[][] {
    return this._board;
  }
  
  public get size(): number {
    return this._size;
  }

  public get boxSize(): number {
    return this._boxSize;
  }

  //Cell Values
  getCellValue(row: number, col: number): number | null {
    if(this.cellExists(row,col)){
      return this._board[row][col].value
    }
    return null
  }

  setCellValue(row: number, col: number, value: number | null): boolean | null{
    if(this.cellExists(row,col)){
      const isValid = this.checkMoveValidity(row,col,value);
      this._board[row][col].value = value;
      this._board[row][col].isValid = isValid;
      return isValid
    }
    return null
  }

  getCellValid(row: number, col: number): boolean | null {
    if(this.cellExists(row,col)){
      return this._board[row][col].isValid
    }
    return null
  }

  getCellFixed(row: number, col: number): boolean | null {
    if(this.cellExists(row,col)){
      return this._board[row][col].fixedValue
    }
    return null
  }

  setCellValid(row: number, col: number, isValid: boolean | null): void {
    if(this.cellExists(row,col)){
      this._board[row][col].isValid = isValid;
    }    
  }

  //Cell Notes
  getCellNotes(row: number, col: number): Set<number> {
    if(this.cellExists(row,col)){
      return this._board[row][col].notes
    }
    return new Set() //TODO : Check if its more memory efficient to refactor to null
  }
  
  addCellNotes(row: number, col: number, note: number): void {
    if(this.cellExists(row,col)){
      this._board[row][col].addNote(note);
    }
  }

  removeCellNote(row: number, col: number, note: number): void {
    if(this.cellExists(row,col)){
      this._board[row][col].removeNote(note);
    }
  }

  clearCellNote(row: number, col: number): void {
    if(this.cellExists(row,col)){
      this._board[row][col].clearNotes();
    }
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
    const boardState = this._board.map(row => row.map(cell => new SudokuCell(cell)));
    return new Memento(boardState);
  }

  restoreFromMemento(memento: Memento): void {
     // Clear the current board
    this._board = [];

    for (const row of memento.getState()) {
        // Create a row for the board
        const boardRow: SudokuCell[] = [];
        
        for (const cellData of row) {
            boardRow.push(cellData);
        }

        // Add the row to the board
        this._board.push(boardRow);
    }
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

  cellExists(row:number,col:number) : boolean{
    return row >= 0 && row < this._board.length 
    && col >= 0 && col < this._board[row].length;
  }
}
