import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {URL_API} from "../shared/constants";
import {Parent} from "../classes/parent";

export abstract class IParentService {
  abstract findParents(): Observable<Parent[]>;
  abstract findParent(id: number): Observable<Parent>;
  abstract createParent(parent: any): Observable<string>;
  abstract editParent(parent: Parent): Observable<string>;
  abstract deleteParent(id: number): Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(
    private http: HttpClient,
  ) { }

  public findParents(): Observable<Parent[]> {
    return this.http.get<Parent[]>(URL_API + 'parent/index');
  }

  public findParent(id: number): Observable<Parent> {
    return this.http.get<Parent>(URL_API + 'parent/details/' + id);
  }

  public createParent(parent: any): Observable<string> {
    return this.http.post<string>(URL_API + 'parent/create', parent);
  }

  public editParent(parent: Parent): Observable<string> {
    return this.http.put<string>(URL_API + 'parent/edit', parent);
  }

  public deleteParent(id: number): Observable<string> {
    return this.http.delete<string>(URL_API + 'parent/delete/' + id);
  }
}
