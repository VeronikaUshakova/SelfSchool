export class Answer {
  private readonly _idAnswer: number = 0;
  private readonly _idPupil: number = 0;
  private readonly _idTask: number = 0;
  private readonly _gradeAnswer: number = 0;
  private readonly _idMaterial: number = 0;
  private readonly _fastAnswer: string = '';

  constructor(idAnswer: number, idPupil: number, idTask: number, gradeAnswer: number,
              idMaterial: number, fastAnswer: string) {
    this._idAnswer = idAnswer;
    this._idPupil = idPupil;
    this._idTask = idTask;
    this._gradeAnswer = gradeAnswer;
    this._idMaterial = idMaterial;
    this._fastAnswer = fastAnswer;
  }

  public get idAnswer(): number {
    return this._idAnswer;
  }

  public get idPupil(): number {
    return this._idPupil;
  }

  public get idTask(): number {
    return this._idTask;
  }

  public get idMaterial(): number {
    return this._idMaterial;
  }

  public get gradeAnswer(): number {
    return this._gradeAnswer;
  }

  public get fastAnswer(): string {
    return this._fastAnswer;
  }
}
