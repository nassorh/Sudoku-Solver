export default class SudokuCell {
    private _value: number | null = null;
    private _notes: Set<number>;
    private _isValid: boolean | null;
    private readonly _fixedValue: boolean;

    constructor(input: number | null | SudokuCell, fixedValue : boolean = false) {
      if (input instanceof SudokuCell){
        this._value = input.value;

        //Copy notes
        this._notes = new Set()
        input.notes.forEach(note => {
          this.addNote(note);
        });

        this._fixedValue = input.fixedValue;
        this._isValid = input._isValid;
      }else{
        this.value = input
        this._notes = new Set();
        this._fixedValue = fixedValue;
        if(fixedValue){
          this._isValid = true;
        }else{
          this._isValid = null;
        }
      }
    }

    //Getter and setters
    public get fixedValue(): boolean {
      return this._fixedValue;
    }

    public get isValid(): boolean | null {
      return this._isValid;
    }
    
    public set isValid(value: boolean | null) {
      if(!this._fixedValue && this._value !== null){
        this._isValid = value;
      }
    }

    public get notes(): Set<number> {
      return this._notes;
    }

    public get value(): number | null {
      return this._value;
    }
  
    public set value(value: number | null) {
      if(value == null){
        this._value = value;
        this._notes?.clear();
      }else if (this.isValidValue(value) && !this._fixedValue) {
        this._value = value;
        this._notes?.clear();
      }
    }

    addNote(note: number): void {
      if (this.isValidValue(note) && !this._fixedValue) {
        this._notes.add(note);
        this._value = null;
      }
    }

    private isValidValue(note: number): boolean {
      return note >= 1 && note <= 9;
    }

    removeNote(note: number): void {
      this._notes.delete(note);
    }

    clearNotes(): void {
      this._notes.clear()
    }
  }

  