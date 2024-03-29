import Sudoku from "./sudoku/Sudoku";
import NumberPad from "./components/NumberPad";
import GameControls from './components/GameControls'
import { useState } from 'react';
import SudokuBoard from "./components/SudokuBoard";

function App() {
  const [selectedSquare, setSelectedSquare] = useState<{ row: number; col: number } | null>(null);
  const [isNotes, setisNotes] = useState<boolean>(false);
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

  //SudokuCanvas
  const handleCellClick = (row: number, col: number) => {
    setSelectedSquare({ row, col });
  };

  //NumberPad
  const handleNumberSelect = (number: number) => {
    if (selectedSquare) {
      const cellValue = game?.board.getCellValue(selectedSquare.row, selectedSquare.col)
      const cellNote = game?.board.getCellNotes(selectedSquare.row, selectedSquare.col)
      setGame((prevGame) => {
        if (!prevGame) return null;
        
        let updatedBoard;
        if(isNotes){
          updatedBoard = new Sudoku(prevGame)
          cellNote?.has(number) ?
          updatedBoard.removeNote(selectedSquare.row, selectedSquare.col,number)
          :updatedBoard.addNote(selectedSquare.row, selectedSquare.col, number);
        }else{
          updatedBoard = new Sudoku(prevGame)
          cellValue === number?
          updatedBoard.clearCell(selectedSquare.row, selectedSquare.col)
          :updatedBoard.fillCell(selectedSquare.row, selectedSquare.col, number)
        }
        
        return updatedBoard;
      });
    }
  };  

  //GameControls
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

  const toggleNotes = () => {
    setisNotes(prevState => !prevState);
  };

  const handleClickUndo = () => {
    if (selectedSquare) {
      setGame((prevGame) => {
        if (!prevGame) return null;
  
        const updatedBoard = new Sudoku(prevGame)
        updatedBoard.undo()
  
        return updatedBoard;
      });
    }
  };  

  const handleClickRedo = () => {
    if (selectedSquare) {
      setGame((prevGame) => {
        if (!prevGame) return null;
  
        const updatedBoard = new Sudoku(prevGame)
        updatedBoard.redo()
  
        return updatedBoard;
      });
    }
  };  

  const handleClickNewGame = () => {
    setGame((prevGame) => {
      if (!prevGame) return null;

      const updatedBoard = new Sudoku(prevGame)
      updatedBoard.resetBoard()

      return updatedBoard;
    });
  }; 
  
  return (
    <div className="App">
      {
        game &&
        <SudokuBoard 
          size={9} boxSize={3} board={game.board} selectedSquare={selectedSquare} onCellClick={handleCellClick}
        />
      }
      <div className="controls">
        <GameControls onClearNumber={handleClearSelect} onClickNotes={toggleNotes} clickStatus={isNotes} onClickUndo={handleClickUndo} onClickRedo={handleClickRedo}/>
        <NumberPad onSelectNumber={handleNumberSelect} onClickNewGame={handleClickNewGame}/>
      </div>
    </div>
  );
}

export default App;
