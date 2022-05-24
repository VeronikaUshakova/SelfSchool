import {Teacher} from "./teacher";
import {Material} from "./material";

export class Lesson {
  private readonly _idLesson: number = 0;
  private readonly _nameLesson: string = '';
  private readonly _teachers: Teacher;
  private readonly _dateLesson: number = 0;
  private readonly _materials: Material[] = [];

  constructor(idLesson: number, nameLesson: string, teachers: Teacher, dateLesson: number, materials: Material[]) {
    this._idLesson = idLesson;
    this._nameLesson = nameLesson;
    this._teachers = teachers;
    this._dateLesson = dateLesson;
    this._materials = materials;
  }

  public get idLesson(): number {
    return this._idLesson;
  }

  public get nameLesson(): string {
    return this._nameLesson;
  }

  public get teachers(): Teacher {
    return this._teachers;
  }

  public get dateLesson(): number {
    return this._dateLesson;
  }

  public get materials(): Material[] {
    return this._materials;
  }
}
