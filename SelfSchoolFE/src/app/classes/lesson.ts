export class Lesson {
  private readonly _idLesson: number = 0;
  private readonly _nameLesson: string = '';
  private readonly _idTeacher: number = 0;
  private readonly _dateLesson: number = 0;

  constructor(idLesson: number, nameLesson: string, idTeacher: number, dateLesson: number) {
    this._idLesson = idLesson;
    this._nameLesson = nameLesson;
    this._idTeacher = idTeacher;
    this._dateLesson = dateLesson;
  }

  public get idLesson(): number {
    return this._idLesson;
  }

  public get nameLesson(): string {
    return this._nameLesson;
  }

  public get idTeacher(): number {
    return this._idTeacher;
  }

  public get dateLesson(): number {
    return this._dateLesson;
  }
}
