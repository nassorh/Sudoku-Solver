import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import NotesIcon from '@mui/icons-material/Notes';
import Typography from '@mui/material/Typography';

interface GameControlsProps{
    onClearNumber : () => void;
    onClickNotes : () => void;
    clickStatus : boolean
    onClickUndo : () => void;
    onClickRedo : () => void;
    isGameComplete : boolean | undefined;
} 

const GameControls = (props : GameControlsProps) => {
    return (
      <div className='game-controls'>
        {props.isGameComplete ?
            (<div className="game-complete-message">
              Congratulations! You've completed the Sudoku puzzle.
            </div>)
            :(<>
                <div>
                  <IconButton className="game-control-icon" key="undo" onClick={() => props.onClickUndo()} aria-label="Undo">
                    <UndoIcon />
                  </IconButton>
                  <Typography variant="button">Undo</Typography>
                </div>

                <div >
                  <IconButton className="game-control-icon" key="clear" onClick={() => props.onClearNumber()} aria-label="Clear">
                    <ClearIcon />
                  </IconButton>
                  <Typography variant="button">Clear</Typography>
                </div>

                <div>
                    {props.clickStatus?
                      <p className="notes-status">on</p>
                      :<p className="notes-status">off</p>
                    }
                  <IconButton className="game-control-icon" key="notes" onClick={() => props.onClickNotes()} aria-label="Notes">
                    <NotesIcon />
                  </IconButton>
                  <Typography variant="button">Notes</Typography>
                </div>

                <div>
                  <IconButton className="game-control-icon"key="redo" onClick={() => props.onClickRedo()} aria-label="Redo">
                    <RedoIcon />
                  </IconButton>
                  <Typography variant="button">Redo</Typography>
                </div>
              </>
            )
        }
    </div>
    );
  };
  
  export default GameControls;