interface GameControlsProps{
    onClearNumber : Function
    onClickNotes : Function
    clickStatus : boolean
    onClickUndo : Function
    onClickRedo : Function
    onClickNewGame : Function
} 

const GameControls = (props : GameControlsProps) => {
    return (
      <div>
          <button key="new" onClick={() => props.onClickNewGame()}>
            New Game
          </button>
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