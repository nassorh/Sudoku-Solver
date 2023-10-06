interface GameControlsProps{
    onClearNumber : Function
    onClickNotes : Function
    clickStatus : boolean
} 

const GameControls = (props : GameControlsProps) => {
    return (
      <div>
          <button key="clear" onClick={() => props.onClearNumber()}>
            clear
          </button>
          <button key="notes" onClick={() => props.onClickNotes()}>
            notes {props.clickStatus.toString()}
          </button>
      </div>
    );
  };
  
  export default GameControls;