export class TaskLesson {
  private readonly _idTask: number = 0;
  private readonly _idLesson: number = 0;
  private readonly _nameTask: string = '';
  private readonly _descriptionTask: string = '';
  private readonly _dateTask: number = 0;
  private readonly _idMaterial: number = 0;

  constructor(idTask: number, idLesson: number, nameTask: string, descriptionTask: string,
              dateTask: number, idMaterial: number) {
    this._idTask = idTask;
    this._idLesson = idLesson;
    this._nameTask = nameTask;
    this._descriptionTask = descriptionTask;
    this._dateTask = dateTask;
    this._idMaterial = idMaterial;
  }

  public get idTask(): number {
    return this._idTask;
  }

  public get idLesson(): number {
    return this._idLesson;
  }

  public get nameTask(): string {
    return this._nameTask;
  }

  public get descriptionTask(): string {
    return this._descriptionTask;
  }

  public get dateTask(): number {
    return this._dateTask;
  }

  public get idMaterial(): number {
    return this._idMaterial;
  }
}
