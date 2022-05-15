import {ClassSchool} from "./class-school";

export class Teacher {
  private readonly _idTeacher: number = 0;
  private readonly _loginTeacher: string = '';
  private readonly _passwordTeacher: string = '';
  private readonly _nameTeacher: string = '';
  private readonly _surnameTeacher: string = '';
  private readonly _birthdayTeacher: number = 0;
  private readonly _emailTeacher: string = '';
  private readonly _phoneTeacher: string = '';
  private readonly _subjectTeacher: string = '';

  constructor(idTeacher: number, loginTeacher: string, passwordTeacher: string, nameTeacher: string,
              surnameTeacher: string, birthdayTeacher: number, emailTeacher: string, phoneTeacher: string,
              subjectTeacher: string) {
    this._idTeacher = idTeacher;
    this._loginTeacher = loginTeacher;
    this._passwordTeacher = passwordTeacher;
    this._nameTeacher = nameTeacher;
    this._surnameTeacher = surnameTeacher;
    this._birthdayTeacher = birthdayTeacher;
    this._emailTeacher = emailTeacher;
    this._phoneTeacher = phoneTeacher;
    this._subjectTeacher = subjectTeacher;
  }

  public get idTeacher(): number {
    return this._idTeacher;
  }

  public get loginTeacher(): string {
    return this._loginTeacher;
  }

  public get passwordTeacher(): string {
    return this._passwordTeacher;
  }

  public get nameTeacher(): string {
    return this._nameTeacher;
  }

  public get surnameTeacher(): string {
    return this._surnameTeacher;
  }

  public get birthdayTeacher(): number {
    return this._birthdayTeacher;
  }

  public get emailTeacher(): string {
    return this._emailTeacher;
  }

  public get phoneTeacher(): string {
    return this._phoneTeacher;
  }

  public get subjectTeacher(): string {
    return this._subjectTeacher;
  }
}
