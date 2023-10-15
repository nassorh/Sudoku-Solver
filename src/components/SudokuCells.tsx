class Border {
    borderTop: string = "1px solid #f1f0f1"
    borderLeft: string = "1px solid #f1f0f1"
    borderBottom: string = "1px solid #f1f0f1"
    borderRight: string = "1px solid #f1f0f1"
}

interface SudokuCellsProps {
    size: number;
    boxSize: number;
    cellsData: {
      row: number;
      col: number;
      value: string | undefined;
      notes: Set<number>;
      isFixed: boolean | null;
      isValid: boolean | null;
    }[];
    selectedSquare: { row: number; col: number } | null;
    onCellClick: (row: number, col: number) => void;
}
  
const SudokuCells = (props: SudokuCellsProps) => {
    const thickBorder = '1px solid #000000';


    const setCellBackgroundColour = (row : number, col : number, isFixed : boolean|null, isValid : boolean|null) => {
        let backgroundColor = '#fff';
        const selectedSquareColor = '#d3d3d3';

        if (isFixed) {
            backgroundColor = '#e6f7ff';
        } else if (
            props.selectedSquare &&
            row === props.selectedSquare.row &&
            col === props.selectedSquare.col
        ) {
            backgroundColor = selectedSquareColor;
        } else if (isValid === false) {
            backgroundColor = '#ffcccc';
        }

        return backgroundColor
    }

    const setBackgroundBorder = (row: number, col: number) =>{
        let border = new Border()
        if (row % props.boxSize === 0) {
            border.borderTop = thickBorder;
        }
        if (col % props.boxSize === 0) {
            border.borderLeft = thickBorder;
        }
        if ((row + 1) % props.boxSize === 0 && row !== 0) {
            border.borderBottom = thickBorder;
        }
        if ((col + 1) % props.boxSize === 0 && col !== 0) {
            border.borderRight = thickBorder;
        }
        return border
    }

    const renderCell = (
        row: number,
        col: number,
        value: string | undefined,
        notes: Set<number>,
        isFixed: boolean | null,
        isValid: boolean | null,
        index: number
    ) => {
        const cellValue = value || (notes.size > 0 ? Array.from(notes).join(', ') : '');
        const backgroundColor = setCellBackgroundColour(row,col,isFixed,isValid)
        const border = setBackgroundBorder(row,col)
        
        return (
        <div
            key={index}
            style={{
            backgroundColor: backgroundColor,
            borderTop: border.borderTop,
            borderLeft: border.borderLeft,
            borderBottom: border.borderBottom,
            borderRight: border.borderRight,
            }}
            className='sudoku-cell'
            onClick={() => props.onCellClick(row, col)}
        >
            {cellValue}
        </div>
        );
    };

    const renderCells = () => {
        return props.cellsData.map(({ row, col, value, notes, isFixed, isValid }, index) => {
        return renderCell(row, col, value, notes, isFixed, isValid, index);
        });
    };

    return (
        <>
            {renderCells()}
        </>
    );
};
  
export default SudokuCells;
  