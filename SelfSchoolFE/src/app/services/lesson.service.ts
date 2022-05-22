import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {URL_API} from "../shared/constants";
import {Lesson} from "../classes/lesson";

export abstract class ILessonService {
  abstract findLessons(): Observable<Lesson[]>;
  abstract findLesson(id: number): Observable<Lesson>;
  abstract createLesson(lesson: Lesson): Observable<string>;
  abstract editLesson(lesson: Lesson): Observable<string>;
  abstract deleteLesson(id: number): Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(
    private http: HttpClient,
  ) { }

  public findLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(URL_API + 'lesson/index');
  }

  public findLesson(id: number): Observable<Lesson> {
    return this.http.get<Lesson>(URL_API + 'lesson/details/' + id);
  }

  public createLesson(lesson: Lesson): Observable<string> {
    return this.http.post<string>(URL_API + 'lesson/create', lesson);
  }

  public editLesson(lesson: Lesson): Observable<string> {
    return this.http.put<string>(URL_API + 'lesson/edit', lesson);
  }

  public deleteLesson(id: number): Observable<string> {
    return this.http.delete<string>(URL_API + 'lesson/delete/' + id);
  }
}
