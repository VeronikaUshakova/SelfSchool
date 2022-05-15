import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {URL_API} from "../shared/constants";
import {Answer} from "../classes/answer";

export abstract class IAnswerService {
  abstract findAnswers(): Observable<Answer[]>;
  abstract findAnswer(id: number): Observable<Answer>;
  abstract createAnswer(answer: Answer): Observable<string>;
  abstract editAnswer(answer: Answer): Observable<string>;
  abstract deleteAnswer(id: number): Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class AnswerService implements IAnswerService{

  constructor(
    private http: HttpClient,
  ) { }

  public findAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(URL_API + 'answer/index');
  }

  public findAnswer(id: number): Observable<Answer> {
    return this.http.get<Answer>(URL_API + 'answer/detail/' + id);
  }

  public createAnswer(answer: Answer): Observable<string> {
    return this.http.post<string>(URL_API + 'answer/create', answer);
  }

  public editAnswer(answer: Answer): Observable<string> {
    return this.http.put<string>(URL_API + 'answer/edit', answer);
  }

  public deleteAnswer(id: number): Observable<string> {
    return this.http.delete<string>(URL_API + 'answer/delete/' + id);
  }
}
