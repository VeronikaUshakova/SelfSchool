import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {URL_API} from "../shared/constants";
import {Pupil} from "../classes/pupil";

export abstract class IPupilService {
  abstract findPupils(): Observable<Pupil[]>;
  abstract findPupil(id: number): Observable<Pupil>;
  abstract createPupil(pupil: Pupil): Observable<string>;
  abstract editPupil(pupil: Pupil): Observable<string>;
  abstract deletePupil(id: number): Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class PupilService {

  constructor(
    private http: HttpClient,
  ) { }

  public findPupils(): Observable<Pupil[]> {
    return this.http.get<Pupil[]>(URL_API + 'pupil/index');
  }

  public findPupil(id: number): Observable<Pupil> {
    return this.http.get<Pupil>(URL_API + 'pupil/details/' + id);
  }

  public createPupil(pupil: Pupil): Observable<string> {
    return this.http.post<string>(URL_API + 'pupil/create', pupil);
  }

  public editPupil(pupil: Pupil): Observable<string> {
    return this.http.put<string>(URL_API + 'pupil/edit', pupil);
  }

  public deletePupil(id: number): Observable<string> {
    return this.http.delete<string>(URL_API + 'pupil/delete/' + id);
  }
}
