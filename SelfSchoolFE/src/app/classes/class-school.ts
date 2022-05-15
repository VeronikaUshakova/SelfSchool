import {Teacher} from "./teacher";

export class ClassSchool {
  private readonly _idClass: number = 0;
  private readonly _teachers: Teacher[] = [];
  private readonly _numberClass: number = 0;
  private readonly _letterClass: string = '';

  constructor(idClass: number, teachers: Teacher[], numberClass: number, letterClass: string) {
    this._idClass = idClass;
    this._teachers = teachers;
    this._numberClass = numberClass;
    this._letterClass = letterClass;
  }

  public get idClass(): number {
    return this._idClass;
  }

  public get teachers(): Teacher[] {
    return this._teachers;
  }

  public get numberClass(): number {
    return this._numberClass;
  }

  public get letterClass(): string {
    return this._letterClass;
  }
}
