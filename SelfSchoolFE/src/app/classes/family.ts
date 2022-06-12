export class Family {
  private readonly _idFamily: number = 0;
  private readonly _parents: number[] = [];
  private readonly _pupils: number[] = [];

  constructor(idFamily: number, parents: number[], pupils: number[]) {
    this._idFamily = idFamily;
    this._parents = parents;
    this._pupils = pupils;
  }

  public get idFamily(): number {
    return this._idFamily;
  }

  public get parents(): number[] {
    return this._parents;
  }

  public get pupils(): number[] {
    return this._pupils;
  }
}
