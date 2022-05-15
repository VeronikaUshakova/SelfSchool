import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {URL_API} from "../shared/constants";
import {HttpClient} from "@angular/common/http";
import {Admin} from "../classes/admin";

export abstract class IAdminService {
  abstract findAdmins(): Observable<Admin[]>;
  abstract findAdmin(id: number): Observable<Admin>;
  abstract createAdmin(admin: Admin): Observable<string>;
  abstract editAdmin(admin: Admin): Observable<string>;
  abstract deleteAdmin(id: number): Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
  ) { }

  public findAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(URL_API + 'admin/index');
  }

  public findAdmin(id: number): Observable<Admin> {
    return this.http.get<Admin>(URL_API + 'admin/detail/' + id);
  }

  public createAdmin(admin: Admin): Observable<string> {
    return this.http.post<string>(URL_API + 'admin/create', admin);
  }

  public editAdmin(admin: Admin): Observable<string> {
    return this.http.put<string>(URL_API + 'admin/edit', admin);
  }

  public deleteAdmin(id: number): Observable<string> {
    return this.http.delete<string>(URL_API + 'admin/delete/' + id);
  }
}
