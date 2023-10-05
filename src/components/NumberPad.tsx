interface NumberPadProps{
    onSelectNumber : Function
    onClearNumber : Function
} 

const NumberPad = (props : NumberPadProps) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div>
      <p>Select a number:</p>
      <div style={{ display: 'flex' }}>
        {numbers.map(number => (
          <button key={number} onClick={() => props.onSelectNumber(number)}>
            {number}
          </button>
        ))}
      </div>
      <div>
        <button key="clear" onClick={() => props.onClearNumber()}>
          clear
        </button>
      </div>
    </div>
  );
};

export default NumberPad;
