export class Pupil {
  private readonly _idPupil: number = 0;
  private readonly _loginPupil: string = '';
  private readonly _passwordPupil: string = '';
  private readonly _namePupil: string = '';
  private readonly _surnamePupil: string = '';
  private readonly _birthdayPupil: number = 0;
  private readonly _emailPupil: string = '';
  private readonly _phonePupil: string = '';
  private readonly _idClass: number = 0;

  constructor(idPupil: number, loginPupil: string, passwordPupil: string, namePupil: string,
              surnamePupil: string, birthdayPupil: number, emailPupil: string, phonePupil: string,
              classes: number) {
    this._idPupil = idPupil;
    this._loginPupil = loginPupil;
    this._passwordPupil = passwordPupil;
    this._namePupil = namePupil;
    this._surnamePupil = surnamePupil;
    this._birthdayPupil = birthdayPupil;
    this._emailPupil = emailPupil;
    this._phonePupil = phonePupil;
    this._idClass = classes;
  }

  public get idPupil(): number {
    return this._idPupil;
  }

  public get loginPupil(): string {
    return this._loginPupil;
  }

  public get passwordPupil(): string {
    return this._passwordPupil;
  }

  public get namePupil(): string {
    return this._namePupil;
  }

  public get surnamePupil(): string {
    return this._surnamePupil;
  }

  public get birthdayPupil(): number {
    return this._birthdayPupil;
  }

  public get emailPupil(): string {
    return this._emailPupil;
  }

  public get phonePupil(): string {
    return this._phonePupil;
  }

  public get idClass(): number {
    return this._idClass;
  }
}
