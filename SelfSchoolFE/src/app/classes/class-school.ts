export class ClassSchool {
  private readonly _idClass: number = 0;
  private readonly _numberClass: number = 0;
  private readonly _letterClass: string = '';

  constructor(idClass: number, numberClass: number, letterClass: string) {
    this._idClass = idClass;
    this._numberClass = numberClass;
    this._letterClass = letterClass;
  }

  public get idClass(): number {
    return this._idClass;
  }

  public get numberClass(): number {
    return this._numberClass;
  }

  public get letterClass(): string {
    return this._letterClass;
  }
}
