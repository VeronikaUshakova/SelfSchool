
export class Lesson_ext {
  private readonly _idLesson: number = 0;
  private readonly _nameLesson: string = '';
  private readonly _teachers: string = '';
  private readonly _dateLesson: string = '';

  constructor(idLesson: number, nameLesson: string, teachers: string, dateLesson: string) {
    this._idLesson = idLesson;
    this._nameLesson = nameLesson;
    this._teachers = teachers;
    this._dateLesson = dateLesson;
  }

  public get idLesson(): number {
    return this._idLesson;
  }

  public get nameLesson(): string {
    return this._nameLesson;
  }

  public get teachers(): string {
    return this._teachers;
  }

  public get dateLesson(): string {
    return this._dateLesson;
  }
}
