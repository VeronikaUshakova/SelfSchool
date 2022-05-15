import {Parent} from "./parent";
import {Pupil} from "./pupil";

export class Family {
  private readonly _idFamily: number = 0;
  private readonly _parents: Parent[] = [];
  private readonly _pupils: Pupil[] = [];

  constructor(idFamily: number, parents: Parent[], pupils: Pupil[]) {
    this._idFamily = idFamily;
    this._parents = parents;
    this._pupils = pupils;
  }

  public get idFamily(): number {
    return this._idFamily;
  }

  public get parents(): Parent[] {
    return this._parents;
  }

  public get pupils(): Pupil[] {
    return this._pupils;
  }
}
