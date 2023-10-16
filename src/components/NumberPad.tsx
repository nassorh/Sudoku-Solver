interface NumberPadProps{
    onSelectNumber : (number: number) => void;
    onClickNewGame : () => void;
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
      <button className="number-pad-new" key="new" onClick={() => props.onClickNewGame()}>
        New Game
      </button>
    </>
  );
};

export default NumberPad;
