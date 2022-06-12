export class Material {
  private readonly _idMaterial: number = 0;
  private readonly _urlMaterial: string = '';
  private readonly _fileMaterial: string = '';

  constructor(idMaterial: number, urlMaterial: string, fileMaterial: string) {
    this._idMaterial = idMaterial;
    this._urlMaterial = urlMaterial;
    this._fileMaterial = fileMaterial;
  }

  public get idMaterial(): number {
    return this._idMaterial;
  }

  public get urlMaterial(): string {
    return this._urlMaterial;
  }

  public get fileMaterial(): string {
    return this._fileMaterial;
  }
}
