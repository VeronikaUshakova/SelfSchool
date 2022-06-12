import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {URL_API} from "../shared/constants";
import {HttpClient} from "@angular/common/http";

export abstract class ILoginService {
  abstract login(data: any): Observable<any>;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  public login(data: any): Observable<any> {
    return this.http.post<any>(URL_API + 'login/login', data);
  }
}
