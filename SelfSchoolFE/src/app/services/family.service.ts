import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {URL_API} from "../shared/constants";
import {Family} from "../classes/family";

export abstract class IFamilyService {
  abstract findFamilies(): Observable<Family[]>;
  abstract findFamily(id: number): Observable<Family>;
  abstract createFamily(family: Family): Observable<string>;
  abstract editFamily(family: Family): Observable<string>;
  abstract deleteFamily(id: number): Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor(
    private http: HttpClient,
  ) { }

  public findFamilies(): Observable<Family[]> {
    return this.http.get<Family[]>(URL_API + 'family/index');
  }

  public findFamily(id: number): Observable<Family> {
    return this.http.get<Family>(URL_API + 'family/details/' + id);
  }

  public createFamily(family: Family): Observable<string> {
    return this.http.post<string>(URL_API + 'family/create', family);
  }

  public editFamily(family: Family): Observable<string> {
    return this.http.put<string>(URL_API + 'family/edit', family);
  }

  public deleteFamily(id: number): Observable<string> {
    return this.http.delete<string>(URL_API + 'family/delete/' + id);
  }
}
