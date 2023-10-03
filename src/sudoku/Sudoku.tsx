import SudokuBoard from './SudokuBoard'
import CareTaker from './CareTaker';

export default class Sudoku {
    private _initialValues : (number | null)[][]
    private _board: SudokuBoard;
    private _careTaker: CareTaker = new CareTaker();
    
    constructor(initialValues : (number | null)[][],size : number, boxSize : number){
        this._initialValues = initialValues
        this._board = new SudokuBoard(initialValues,size,boxSize)
        this.saveState();// Save inital state of board
    }

    public get board(): SudokuBoard {
        return this._board;
    }

    resetBoard() : void{
        this._board.reset(this._initialValues)
    }

    private saveState(): void {
        const memento = this._board.createMemento();
        this._careTaker.addMemento(memento);
    }

    undo(): boolean {
        const memento = this._careTaker.undo();
        if (memento) {
          this._board.restoreFromMemento(memento);
          return true
        }
        return false
    }

    redo(): boolean {
        const memento = this._careTaker.redo();
        if (memento) {
          this._board.restoreFromMemento(memento);
          return true
        }
        return false
    }

    fillCell(row: number, col: number, value: number): boolean {
        if (this._board.getCellValue(row,col) === value) {
            return false
        }
        this._board.setCellValue(row, col, value);
        this.saveState();
        return true 
    }

    clearCell(row: number, col: number): boolean {
        if (this._initialValues[row][col] !== null) {
            this._board.setCellValue(row, col, null);
            this.saveState();
            return true
        }
        return false
    }

    addNote(row: number, col: number, value: number): boolean {
        if (!this._board.getCellNotes(row,col).has(value)) {
            this._board.addCellNotes(row, col, value);
            this.saveState();
            return true
        }
        return false
    }

    removeNote(row: number, col: number, value: number): boolean {
        if (this._board.getCellNotes(row,col).has(value)) {
            this._board.removeCellNote(row, col, value);
            this.saveState();
            return true
        }
        return false
    }
}