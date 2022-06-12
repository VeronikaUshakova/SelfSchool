import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {RoleEnum} from "../shared/constants";

export abstract class IUserService {
  abstract setUserRole(role: RoleEnum): void;
  abstract getUserRole(): Observable<RoleEnum>;
  abstract setUserID(id: number): void;
  abstract getUserID(): Observable<number>;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private role: BehaviorSubject<RoleEnum> = new BehaviorSubject<RoleEnum>('');
  private userID: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public setUserRole(role: RoleEnum): void {
    this.role.next(role);
  }

  public getUserRole(): Observable<RoleEnum> {
    return this.role.asObservable();
  }

  public setUserID(id: number): void {
    this.userID.next(id);
  }

  public getUserID(): Observable<number> {
    return this.userID.asObservable();
  }
}
