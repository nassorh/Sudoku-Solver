import sudokuPuzzles from './sudoku/sudokuPuzzles.json'; // Replace with your file path

export function getRandomSudoku() {
  const randomIndex = Math.floor(Math.random() * sudokuPuzzles.length);
  return sudokuPuzzles[randomIndex];
}
