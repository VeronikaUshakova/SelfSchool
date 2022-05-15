import {Pupil} from "./pupil";

export class Answer {
  private readonly _idAnswer: number = 0;
  private readonly _pupils: Pupil[] = [];
  private readonly _tasks: Task[] = [];
  private readonly _gradeAnswer: number = 0;
  private readonly _fileAnswer: string = '';
  private readonly _fastAnswer: string = '';

  constructor(idAnswer: number, pupils: Pupil[], tasks: Task[], gradeAnswer: number,
              fileAnswer: string, fastAnswer: string) {
    this._idAnswer = idAnswer;
    this._pupils = pupils;
    this._tasks = tasks;
    this._gradeAnswer = gradeAnswer;
    this._fileAnswer = fileAnswer;
    this._fastAnswer = fastAnswer;
  }

  public get idAnswer(): number {
    return this._idAnswer;
  }

  public get pupils(): Pupil[] {
    return this._pupils;
  }

  public get tasks(): Task[] {
    return this._tasks;
  }

  public get fileAnswer(): string {
    return this._fileAnswer;
  }

  public get gradeAnswer(): number {
    return this._gradeAnswer;
  }

  public get fastAnswer(): string {
    return this._fastAnswer;
  }
}
