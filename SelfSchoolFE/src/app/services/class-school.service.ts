import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {URL_API} from "../shared/constants";
import {ClassSchool} from "../classes/class-school";

export abstract class IClassSchoolService {
  abstract findClassSchools(): Observable<ClassSchool[]>;
  abstract findClassSchool(id: number): Observable<ClassSchool>;
  abstract createClassSchool(classSchool: ClassSchool): Observable<string>;
  abstract editClassSchool(classSchool: ClassSchool): Observable<string>;
  abstract deleteClassSchool(id: number): Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class ClassSchoolService {

  constructor(
    private http: HttpClient,
  ) { }

  public findClassSchools(): Observable<ClassSchool[]> {
    return this.http.get<ClassSchool[]>(URL_API + 'classschool/index');
  }

  public findClassSchool(id: number): Observable<ClassSchool> {
    return this.http.get<ClassSchool>(URL_API + 'classschool/detail/' + id);
  }

  public createClassSchool(classSchool: ClassSchool): Observable<string> {
    return this.http.post<string>(URL_API + 'classschool/create', classSchool);
  }

  public editClassSchool(classSchool: ClassSchool): Observable<string> {
    return this.http.put<string>(URL_API + 'classschool/edit', classSchool);
  }

  public deleteClassSchool(id: number): Observable<string> {
    return this.http.delete<string>(URL_API + 'classschool/delete/' + id);
  }
}
