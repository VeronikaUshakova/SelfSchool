import {Lesson} from "./lesson";
import {Material} from "./material";

export class TaskLesson {
  private readonly _idTask: number = 0;
  private readonly _lessons: Lesson[] = [];
  private readonly _nameTask: string = '';
  private readonly _descriptionTask: string = '';
  private readonly _dateTask: number = 0;
  private readonly _materials: Material[] = [];

  constructor(idTask: number, lessons: Lesson[], nameTask: string, descriptionTask: string,
              dateTask: number, materials: Material[]) {
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

  public get lessons(): Lesson[] {
    return this._lessons;
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

  public get materials(): Material[] {
    return this._materials;
  }
}
