import SudokuBoard from './SudokuBoard';

class SudokuSolver {
  private _board: SudokuBoard;

  constructor(board: SudokuBoard) {
    this._board = board;
  }

  public get board(): SudokuBoard {
    return this._board;
  }

  solve(): boolean {
    const emptyCell = this.findEmptyCell();

    if (!emptyCell) {
      return true;
    }

    const { row, col } = emptyCell;

    for (let num = 1; num <= this._board.size; num++) {
      if (this._board.checkMoveValidity(row, col, num)) {
        this._board.setCellValue(row, col, num);

        if (this.solve()) {
          return true;
        }

        this._board.setCellValue(row, col, null);
      }
    }
    
    return false;
  }

  private findEmptyCell(): { row: number; col: number } | null {
    for (let row = 0; row < this._board.size; row++) {
      for (let col = 0; col < this._board.size; col++) {
        if (this._board.getCellValue(row, col) === null) {
          return { row, col };
        }
      }
    }
    return null;
  }
}

export default SudokuSolver;
