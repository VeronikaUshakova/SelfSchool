import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {URL_API} from "../shared/constants";
import {TaskLesson} from "../classes/task-lesson";

export abstract class ITaskLessonService {
  abstract findTaskLessons(): Observable<TaskLesson[]>;
  abstract findTaskLesson(id: number): Observable<TaskLesson>;
  abstract createTaskLesson(taskLesson: TaskLesson): Observable<string>;
  abstract editTaskLesson(taskLesson: TaskLesson): Observable<string>;
  abstract deleteTaskLesson(id: number): Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class TaskLessonService {

  constructor(
    private http: HttpClient,
  ) { }

  public findTaskLessons(): Observable<TaskLesson[]> {
    return this.http.get<TaskLesson[]>(URL_API + 'tasklesson/index');
  }

  public findTaskLesson(id: number): Observable<TaskLesson> {
    return this.http.get<TaskLesson>(URL_API + 'tasklesson/details/' + id);
  }

  public createTaskLesson(taskLesson: TaskLesson): Observable<string> {
    return this.http.post<string>(URL_API + 'tasklesson/create', taskLesson);
  }

  public editTaskLesson(taskLesson: TaskLesson): Observable<string> {
    return this.http.put<string>(URL_API + 'tasklesson/edit', taskLesson);
  }

  public deleteTaskLesson(id: number): Observable<string> {
    return this.http.delete<string>(URL_API + 'tasklesson/delete/' + id);
  }
}
