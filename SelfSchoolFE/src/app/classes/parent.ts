export class Parent {
  private readonly _idParent: number = 0;
  private readonly _loginParent: string = '';
  private readonly _passwordParent: string = '';
  private readonly _nameParent: string = '';
  private readonly _surnameParent: string = '';
  private readonly _birthdayParent: number = 0;
  private readonly _emailParent: string = '';
  private readonly _phoneParent: string = '';

  constructor(idParent: number, loginParent: string, passwordParent: string, nameParent: string,
              surnameParent: string, birthdayParent: number, emailParent: string, phoneParent: string) {
    this._idParent = idParent;
    this._loginParent = loginParent;
    this._passwordParent = passwordParent;
    this._nameParent = nameParent;
    this._surnameParent = surnameParent;
    this._birthdayParent = birthdayParent;
    this._emailParent = emailParent;
    this._phoneParent = phoneParent;
  }

  public get idParent(): number {
    return this._idParent;
  }

  public get loginParent(): string {
    return this._loginParent;
  }

  public get passwordParent(): string {
    return this._passwordParent;
  }

  public get nameParent(): string {
    return this._nameParent;
  }

  public get surnameParent(): string {
    return this._surnameParent;
  }

  public get birthdayParent(): number {
    return this._birthdayParent;
  }

  public get emailParent(): string {
    return this._emailParent;
  }

  public get phoneParent(): string {
    return this._phoneParent;
  }
}
