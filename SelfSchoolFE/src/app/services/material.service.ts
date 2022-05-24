import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {URL_API} from "../shared/constants";
import {Material} from "../classes/material";

export abstract class IMaterialService {
  abstract findMaterials(): Observable<Material[]>;
  abstract findMaterial(id: number): Observable<Material>;
  abstract downloadMaterial(fileUrl: string): Observable<Blob>;
  abstract uploadMaterial(formData: FormData): Observable<any>;
  abstract createMaterial(material: Material): Observable<string>;
  abstract editMaterial(material: Material): Observable<string>;
  abstract deleteMaterial(id: number): Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(
    private http: HttpClient,
  ) { }

  public findMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(URL_API + 'material/index');
  }

  public findMaterial(id: number): Observable<Material> {
    return this.http.get<Material>(URL_API + 'material/details/' + id);
  }

  /*public downloadMaterial(fileUrl: string): Observable<Blob> {
    return this.http.get(URL_API + fileUrl, {
      reportProgress: true,
      responseType: 'blob',
    });
  }*/

  public uploadMaterial(formData: FormData): Observable<any> {
    return this.http.post(URL_API + 'material/upload', formData, {reportProgress: true, observe: 'events'})
  }

  public createMaterial(material: Material): Observable<string> {
    return this.http.post<string>(URL_API + 'material/create', material);
  }

  public editMaterial(material: Material): Observable<string> {
    return this.http.put<string>(URL_API + 'material/edit', material);
  }

  public deleteMaterial(id: number): Observable<string> {
    return this.http.delete<string>(URL_API + 'material/delete/' + id);
  }
}
