import Sudoku from './Sudoku';

class SudokuSolver {
  private _sudoku: Sudoku;

  constructor(sudoku: Sudoku) {
    this._sudoku = sudoku;
  }

  public get sudoku(): Sudoku {
    return this._sudoku;
  }

  solve(): boolean {
    const emptyCell = this.findEmptyCell();

    if (!emptyCell) {
      return true;
    }

    const { row, col } = emptyCell;

    for (let num = 1; num <= this._sudoku.board.size; num++) {
      if (this._sudoku.board.checkMoveValidity(row, col, num)) {
        this._sudoku.board.setCellValue(row, col, num);

        if (this.solve()) {
          return true;
        }

        this._sudoku.board.setCellValue(row, col, null);
      }
    }

    return false;
  }

  private findEmptyCell(): { row: number; col: number } | null {
    for (let row = 0; row < this._sudoku.board.size; row++) {
      for (let col = 0; col < this._sudoku.board.size; col++) {
        if (this._sudoku.board.getCellValue(row, col) === null) {
          return { row, col };
        }
      }
    }
    return null;
  }
}

export default SudokuSolver;
