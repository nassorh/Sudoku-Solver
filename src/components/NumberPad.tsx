interface NumberPadProps{
    onSelectNumber : (number: number) => void;
    onClickNewGame : () => void;
    onClickSolveGame : () => void;
    isGameComplete : boolean | undefined;
} 

const NumberPad = (props : NumberPadProps) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
    {!props.isGameComplete && 
      <div className="number-pad">
        {numbers.map(number => (
          <button className="number-button" key={number} onClick={() => props.onSelectNumber(number)}>
            {number}
          </button>
        ))}
      </div>
    }
      <div className="number-pad-button-wrapper">
        <button className="number-pad-button" key="solve" onClick={() => props.onClickSolveGame()}>
          Solve Game
        </button>
        <button className="number-pad-button" key="new" onClick={() => props.onClickNewGame()}>
          New Game
        </button>
      </div>
    </>
  );
};

export default NumberPad;
