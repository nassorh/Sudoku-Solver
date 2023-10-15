import SudokuCells from './SudokuCells'
import { useState,useEffect } from 'react';
import SudokuBoardModel from '../sudoku/SudokuBoard'

interface SudokuBoardProps {
  size: number;
  boxSize: number;
  board: SudokuBoardModel;
  selectedSquare: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
}

const SudokuBoard = (props : SudokuBoardProps) => {
  const [cellSize, setCellSize] = useState(50);

  useEffect(() => {
    const calculateCellSize = () => {
      const maxGridSize = 500;
      const parent = document.getElementById('root');
      if (parent) {
        const cellSize = Math.min(maxGridSize / props.size, parent.clientWidth / props.size);
        setCellSize(cellSize);
      }
    };

    calculateCellSize();
    window.addEventListener('resize', calculateCellSize);

    return () => {
      window.removeEventListener('resize', calculateCellSize);
    };
  }, [props.size]);

  const handleCellClick = (row: number, col: number) => {
    const isCellFixed = props.board.getCellFixed(row, col);

    if (!isCellFixed) {
      props.onCellClick(row, col);
    }
  };

  const getNotes = (notes: Set<number>) => {
    if(notes.size > 0){
      const orderedNotes = Array.from({ length: props.size }, (_, index) => index + 1);
      const sortedNotes = orderedNotes.filter((note) => notes.has(note));
      return sortedNotes.join(', ');
    }
  };

  const sudokuCellsData = Array.from({ length: props.size * props.size }, (_, index) => {
    const row = Math.floor(index / props.size);
    const col = index % props.size;
    const value = props.board.getCellValue(row, col)?.toString();
    const notes = props.board.getCellNotes(row, col);
    const isFixed = props.board.getCellFixed(row, col);
    const isValid = props.board.getCellValid(row, col);

    return { row, col, value, notes, isFixed, isValid };
  });

  return (
    <div
      id="sudoku-board-container"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${props.size}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${props.size}, ${cellSize}px)`,
      }}
    >
      <SudokuCells
        size={props.size}
        boxSize={props.boxSize}
        cellsData={sudokuCellsData}
        selectedSquare={props.selectedSquare}
        onCellClick={props.onCellClick}
      />
    </div>
  );
};

export default SudokuBoard;
