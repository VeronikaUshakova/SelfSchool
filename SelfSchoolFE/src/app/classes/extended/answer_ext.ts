export class Answer_ext {
  private readonly _idAnswer: number = 0;
  private readonly _pupil: string = '';
  private readonly _task: string = '';
  private readonly _gradeAnswer: number = 0;
  private readonly _material: string = '';
  private readonly _fastAnswer: string = '';

  constructor(idAnswer: number, pupil: string, task: string, gradeAnswer: number,
              material: string, fastAnswer: string) {
    this._idAnswer = idAnswer;
    this._pupil = pupil;
    this._task = task;
    this._gradeAnswer = gradeAnswer;
    this._material = material;
    this._fastAnswer = fastAnswer;
  }

  public get idAnswer(): number {
    return this._idAnswer;
  }

  public get pupil(): string {
    return this._pupil;
  }

  public get task(): string {
    return this._task;
  }

  public get material(): string {
    return this._material;
  }

  public get gradeAnswer(): number {
    return this._gradeAnswer;
  }

  public get fastAnswer(): string {
    return this._fastAnswer;
  }
}
