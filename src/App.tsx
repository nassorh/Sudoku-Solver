import Sudoku from "./sudoku/Sudoku";
import SudokuCanvas from "./components/SudokuCanvas";
import NumberPad from "./components/NumberPad";
import { useState,useEffect } from 'react';

function App() {
  const [selectedSquare, setSelectedSquare] = useState<{ row: number; col: number } | null>(null);
  const [game, setGame] = useState<Sudoku | null>(new Sudoku(
    [
      [5, 3, null, null, 7, null, null, null, null],
      [6, null, null, 1, 9, 5, null, null, null],
      [null, 9, 8, null, null, null, null, 6, null],
      [8, null, null, null, 6, null, null, null, 3],
      [4, null, null, 8, null, 3, null, null, 1],
      [7, null, null, null, 2, null, null, null, 6],
      [null, 6, null, null, null, null, 2, 8, null],
      [null, null, null, 4, 1, 9, null, null, 5],
      [null, null, null, null, 8, null, null, 7, 9]
    ]
  ))

  const handleCellClick = (row: number, col: number) => {
    setSelectedSquare({ row, col });
  };

  const handleNumberSelect = (number: number) => {
    if (selectedSquare) {
      setGame((prevGame) => {
        if (!prevGame) return null;
  
        const updatedBoard = new Sudoku(prevGame)
        const isValid = updatedBoard.fillCell(selectedSquare.row, selectedSquare.col, number);
  
        return updatedBoard;
      });
    }
  };  

  const handleClearSelect = () => {
    if (selectedSquare) {
      setGame((prevGame) => {
        if (!prevGame) return null;
  
        const updatedBoard = new Sudoku(prevGame)
        updatedBoard.clearCell(selectedSquare.row, selectedSquare.col);
  
        return updatedBoard;
      });
    }
  };  
  
  return (
    <div className="App">
      {
        game &&
        <SudokuCanvas 
          board = {game.board} 
          size={9} 
          boxSize={3}
          selectedSquare={selectedSquare}
          onCellClick={handleCellClick}
        />
      }
      <NumberPad onSelectNumber={handleNumberSelect} onClearNumber={handleClearSelect}/>
    </div>
  );
}

export default App;
