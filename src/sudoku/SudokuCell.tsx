export default class SudokuCell {
    private _value: number | null;
    private _notes: Set<number>;
    private _isValid: boolean | null;
    private readonly _fixedValue: boolean;

    constructor(value: number | null, fixedValue : boolean = false) {
      this._value = value;
      this._notes = new Set();
      this._fixedValue = fixedValue;
      if(fixedValue){
        this._isValid = true;
      }else{
        this._isValid = null;
      }
    }

    static copyFrom(cell: SudokuCell): SudokuCell {
      const copiedCell = new SudokuCell(cell.value, cell.fixedValue);
  
      // Copy notes
      cell.notes.forEach(note => {
        copiedCell.addNote(note);
      });
  
      // Copy isValid
      copiedCell.isValid = cell.isValid;
  
      return copiedCell;
    }

    //Getter and setters
    public get fixedValue(): boolean {
      return this._fixedValue;
    }

    public get isValid(): boolean | null {
      return this._isValid;
    }
    
    public set isValid(value: boolean | null) {
      this._isValid = value;
    }

    public get notes(): Set<number> {
      return this._notes;
    }

    public get value(): number | null {
      return this._value;
    }
  
    public set value(value: number | null) {
      if (!this._fixedValue) {
        this._value = value;
        this._notes.clear();
      }
    }

    addNote(note: number): void {
      if (this.isValidNoteValue(note) && !this._fixedValue) {
        this._notes.add(note);
        this._value = null;
      }
    }

    private isValidNoteValue(note: number): boolean {
      return note >= 1 && note <= 9;
    }

    removeNote(note: number): void {
      this._notes.delete(note);
    }

    clearNotes(): void {
      this._notes.clear()
    }
  }

  