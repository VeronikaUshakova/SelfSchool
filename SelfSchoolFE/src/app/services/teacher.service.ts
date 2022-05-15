import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {URL_API} from "../shared/constants";
import {Teacher} from "../classes/teacher";

export abstract class ITeacherService {
  abstract findTeachers(): Observable<Teacher[]>;
  abstract findTeacher(id: number): Observable<Teacher>;
  abstract createTeacher(teacher: Teacher): Observable<string>;
  abstract editTeacher(teacher: Teacher): Observable<string>;
  abstract deleteTeacher(id: number): Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(
    private http: HttpClient,
  ) { }

  public findTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(URL_API + 'teacher/index');
  }

  public findTeacher(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(URL_API + 'teacher/detail/' + id);
  }

  public createTeacher(teacher: Teacher): Observable<string> {
    return this.http.post<string>(URL_API + 'teacher/create', teacher);
  }

  public editTeacher(teacher: Teacher): Observable<string> {
    return this.http.put<string>(URL_API + 'teacher/edit', teacher);
  }

  public deleteTeacher(id: number): Observable<string> {
    return this.http.delete<string>(URL_API + 'teacher/delete/' + id);
  }
}
