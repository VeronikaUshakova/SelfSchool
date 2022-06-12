export class TaskLesson_ext {
  private readonly _idTask: number = 0;
  private readonly _lessons: string = '';
  private readonly _nameTask: string = '';
  private readonly _descriptionTask: string = '';
  private readonly _dateTask: string = '';
  private readonly _materials: string = '';

  constructor(idTask: number, lessons: string, nameTask: string, descriptionTask: string,
              dateTask: string, materials: string) {
    this._idTask = idTask;
    this._lessons = lessons;
    this._nameTask = nameTask;
    this._descriptionTask = descriptionTask;
    this._dateTask = dateTask;
    this._materials = materials;
  }

  public get idTask(): number {
    return this._idTask;
  }

  public get lessons(): string {
    return this._lessons;
  }

  public get nameTask(): string {
    return this._nameTask;
  }

  public get descriptionTask(): string {
    return this._descriptionTask;
  }

  public get dateTask(): string {
    return this._dateTask;
  }

  public get materials(): string {
    return this._materials;
  }
}
