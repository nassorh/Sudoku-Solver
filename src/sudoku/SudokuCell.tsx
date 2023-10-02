export default class SudokuCell {
    private _value: number | null;
    private _notes: Set<number>;

    constructor(value: number | null) {
      this._value = value;
      this._notes = new Set();
    }

    //Getter and setters
    public get notes(): Set<number> {
      return this._notes;
    }

    public get value(): number | null {
      return this._value;
    }
  
    public set value(value: number | null){
      this._value = value;
      this._notes.clear()
    }

    addNote(note: number): void {
      if (this.isValidNoteValue(note)) {
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

  