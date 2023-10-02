import SudokuBoard from './SudokuBoard'

class Sudoku {
    private _initialValues : (number | null)[][]
    private _board : SudokuBoard;
    
    constructor(initialValues : (number | null)[][],size : number, boxSize : number){
        this._initialValues = initialValues
        this._board = new SudokuBoard(initialValues,size,boxSize)
    }

    resetBoard() : void{
        this._board.reset(this._initialValues)
    }
}

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

const sudoku = new Sudoku(sudokuArray,size,boxSize)