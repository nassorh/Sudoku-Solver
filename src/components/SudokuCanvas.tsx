import { useEffect, useRef, useState } from 'react';
import SudokuBoard from '../sudoku/SudokuBoard';
interface SudokuCanvasProps {
  size: number;
  boxSize: number;
  board: SudokuBoard;
  selectedSquare: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
}

const SudokuCanvas = (props : SudokuCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const cellSize = 50; 
    const lineWidth = 1;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid(context, props.size, props.boxSize);
        drawValues(context, props.board, props.size, props.boxSize);
        drawHighlight(context, props.selectedSquare);
    }, [props.size, props.boxSize, props.board,props.selectedSquare]);

    const drawGrid = (context: CanvasRenderingContext2D, size: number, boxSize: number) => {
      drawLines(context, size, '#000', 1);
      drawLines(context, size, '#000', 2, boxSize);
    };

    const drawLines = (
      context: CanvasRenderingContext2D,
      size: number,
      color: string,
      lineWidth: number,
      step?: number
    ) => {
      context.lineWidth = lineWidth;
      context.strokeStyle = color;
  
      for (let i = 0; i <= size; i += step || 1) {
        drawHorizontalLine(context, i * cellSize, size * cellSize);
        drawVerticalLine(context, i * cellSize, size * cellSize);
      }
    };

    const drawHorizontalLine = (context: CanvasRenderingContext2D, y: number, length: number) => {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(length, y);
      context.stroke();
    };

    const drawVerticalLine = (context: CanvasRenderingContext2D, x: number, length: number) => {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, length);
      context.stroke();
    };
    
    const drawValues = (context: CanvasRenderingContext2D, board: SudokuBoard, size: number, boxSize: number) => {
      context.font = '20px Arial'; // Set the font size and family

      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          const cellValue = board.getCellValue(row, col);

          if (cellValue !== null) {
            drawCellText(context, cellValue, row, col, size, boxSize, board);
          }
        }
      }
    };  

    const drawCellText = (
      context: CanvasRenderingContext2D,
      cellValue: number,
      row: number,
      col: number,
      size: number,
      boxSize: number,
      board: SudokuBoard
    ) => {
      const x = col * cellSize + cellSize / 2;
      const y = row * cellSize + cellSize / 2;
  
      const isFixed = board.getCellFixed(row, col);
      const color = isFixed ? 'blue' : (board.getCellValid(row, col) ? 'black' : 'red');
  
      context.fillStyle = color;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(cellValue.toString(), x, y);
    };

    const drawHighlight = (
      context: CanvasRenderingContext2D,
      selectedSquare: { row: number; col: number } | null
    ) => {
      if (!selectedSquare) return;
    
      const { row, col } = selectedSquare;
      const x = col * cellSize;
      const y = row * cellSize;
    
      context.fillStyle = 'rgba(173, 216, 230, 0.5)'; 
      context.fillRect(x, y, cellSize, cellSize);
      context.strokeRect(x, y, cellSize, cellSize); 
    };
      
    const handleCellClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
  
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
  
      const col = Math.floor(x / cellSize);
      const row = Math.floor(y / cellSize);
      
      if(!props.board.getCellFixed(row,col)){
        props.onCellClick(row, col);
      }
    };

    return(
        <canvas 
            ref={canvasRef} 
            width={cellSize*props.size} 
            height={cellSize*props.size} 
            style={{ border: '1px solid #000' }} 
            onClick={handleCellClick}
        />
    )
};

export default SudokuCanvas;
