interface GameControlsProps{
    onClearNumber : Function
    onClickNotes : Function
    clickStatus : boolean
    onClickUndo : Function
    onClickRedo : Function
} 

const GameControls = (props : GameControlsProps) => {
    return (
      <div>
          <button key="undo" onClick={() => props.onClickUndo()}>
            undo
          </button>
          <button key="clear" onClick={() => props.onClearNumber()}>
            clear
          </button>
          <button key="notes" onClick={() => props.onClickNotes()}>
            notes {props.clickStatus.toString()}
          </button>
          <button key="redo" onClick={() => props.onClickRedo()}>
            redo
          </button>
      </div>
    );
  };
  
  export default GameControls;