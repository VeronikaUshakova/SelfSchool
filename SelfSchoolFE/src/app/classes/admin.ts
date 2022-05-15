export class Admin {
  private readonly _idAdmin: number = 0;
  private readonly _login: string = '';
  private readonly _password: string = '';

  constructor(idAdmin: number, login: string, password: string) {
    this._idAdmin = idAdmin;
    this._login = login;
    this._password = password;
  }

  public get idAdmin(): number {
    return this._idAdmin;
  }

  public get login(): string {
    return this._login;
  }

  public get password(): string {
    return this._password;
  }
}
