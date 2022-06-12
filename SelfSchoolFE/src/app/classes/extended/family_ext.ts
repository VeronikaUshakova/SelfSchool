export class Family_ext {
  private readonly _idFamily: number = 0;
  private readonly _parents: string;
  private readonly _pupils: string;

  constructor(idFamily: number, parents: string, pupils: string) {
    this._idFamily = idFamily;
    this._parents = parents;
    this._pupils = pupils;
  }

  public get idFamily(): number {
    return this._idFamily;
  }

  public get parents(): string {
    return this._parents;
  }

  public get pupils(): string {
    return this._pupils;
  }
}
